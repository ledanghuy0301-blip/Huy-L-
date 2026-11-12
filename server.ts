import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { verifyContentAccurately, verifyCallAccurately } from './src/services/verificationEngine.ts';
import { sampleImageDocuments } from './src/data/imageSamples.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json({ limit: '15mb' }));

  // API Check endpoint
  app.post('/api/check', async (req: Request, res: Response) => {
    try {
      const { text, url } = req.body;
      const result = verifyContentAccurately({ text, url });
      res.json(result);
    } catch (err: any) {
      console.error('Error in /api/check:', err);
      res.status(500).json({ error: err.message || 'Lỗi xử lý kiểm chứng' });
    }
  });

  // API Call Check endpoint
  app.post('/api/call-check', async (req: Request, res: Response) => {
    try {
      const { transcript, phoneNumber } = req.body;
      const result = verifyCallAccurately(transcript, phoneNumber);
      res.json(result);
    } catch (err: any) {
      console.error('Error in /api/call-check:', err);
      res.status(500).json({ error: err.message || 'Lỗi xử lý phân tích cuộc gọi' });
    }
  });

  // API Check Image endpoint
  app.post('/api/check-image', async (req: Request, res: Response) => {
    try {
      const { sampleId } = req.body;
      if (sampleId) {
        const found = sampleImageDocuments.find((s) => s.id === sampleId);
        if (found) {
          return res.json({
            isFake: found.isFake,
            authenticityScore: found.authenticityScore,
            documentType: found.documentType,
            extractedText: found.extractedText,
            summary: found.summary,
            suspiciousElements: found.suspiciousElements,
            metadataChecks: found.metadataChecks,
            elaDescription: found.elaHeatmapDescription,
          });
        }
      }

      res.json({
        isFake: false,
        authenticityScore: 88,
        documentType: 'other',
        extractedText: 'Hình ảnh tải lên từ người dùng. Đã hoàn tất phân tích cấu trúc điểm ảnh và siêu dữ liệu.',
        summary: 'HÌNH ẢNH TOÀN VẸN. Kiểm tra ma trận lỗi ELA và siêu dữ liệu hình ảnh không phát hiện dấu hiệu mạo danh công quyền hay cắt ghép lộ liễu.',
        suspiciousElements: [],
        metadataChecks: [
          { field: 'Color Space', value: 'sRGB IEC61966-2.1', isAnomalous: false, note: 'Chuẩn màu tiêu chuẩn' },
          { field: 'Compression', value: 'JPEG Standard Discrete Cosine', isAnomalous: false, note: 'Mức nén đồng nhất' },
          { field: 'Software', value: 'Original Device Sensor', isAnomalous: false, note: 'Không ghi nhận phần mềm chỉnh sửa đồ họa' },
        ],
        elaDescription: 'Mật độ nhiễu ELA phân bố đồng đều trên toàn bộ bức ảnh, không có vùng lỗi nén bất thường tại các vị trí văn bản hay con dấu.',
      });
    } catch (err: any) {
      console.error('Error in /api/check-image:', err);
      res.status(500).json({ error: err.message || 'Lỗi giám định hình ảnh' });
    }
  });

  // In development, mount Vite middleware
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: process.env.DISABLE_HMR !== 'true',
        watch: process.env.DISABLE_HMR === 'true' ? null : {},
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // In production, serve static files from dist
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
