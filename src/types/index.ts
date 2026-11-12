export type VerdictType = 'true' | 'mostly_true' | 'mixed' | 'mostly_false' | 'false' | 'unverified';

export type StanceType = 'support' | 'refute' | 'neutral';

export type SourceCategory = 'academic' | 'government' | 'news' | 'organization' | 'other';

export interface Claim {
  id: string;
  text: string;
  verdict: VerdictType;
  confidence: number;
  reasoning: string;
}

export interface SourceLocation {
  country: string;
  city?: string;
  lat: number;
  lng: number;
}

export interface Source {
  id: string;
  name: string;
  url: string;
  category: SourceCategory;
  independenceWeight: number;
  credibilityRating: number;
  stance: StanceType;
  quote: string;
  location?: SourceLocation;
}

export interface KnowledgeGraphNode {
  id: string;
  label: string;
  type: 'claim' | 'entity' | 'source';
  category?: string;
  stance?: StanceType;
  verdict?: VerdictType;
  x?: number;
  y?: number;
}

export interface KnowledgeGraphEdge {
  source: string;
  target: string;
  relationship: StanceType | 'mentions';
  label: string;
}

export interface KnowledgeGraph {
  nodes: KnowledgeGraphNode[];
  edges: KnowledgeGraphEdge[];
}

export interface VerificationReport {
  overallScore: number;
  summary: string;
  claims: Claim[];
  sources: Source[];
  graph: KnowledgeGraph;
  sourceIndex?: number;
  verifiedAt?: string;
}

export interface CallSign {
  quote: string;
  explanation: string;
}

export interface CallAnalysis {
  level: 'safe' | 'suspicious' | 'scam';
  risk: number;
  summary: string;
  signs: CallSign[];
  tactics?: {
    urgency: number;
    authority: number;
    financial: number;
    isolation: number;
  };
  advice: string[];
}

export interface User {
  id: string;
  email: string;
  display_name: string;
}

export interface HistoryItem {
  id: string;
  kind: 'text' | 'url' | 'call' | 'image';
  input: string;
  score: number;
  verdict: string;
  report: any;
  created_at: string;
}
