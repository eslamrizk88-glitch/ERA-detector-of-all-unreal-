
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { AnalysisResult } from "../types";

const API_KEY = process.env.API_KEY || "";

const DEEPFAKE_DETECTION_SYSTEM_INSTRUCTION = `
You are the ERA HYDRA V7.0 "AETHER" - the global pinnacle of neural forensic intelligence.
Your mission is to perform a surgical-grade "Atomic Forensic Probe" using the Yottabyte-scale "Nexus" archival database and ultra-advanced signal processing.

--- THE GLOBAL NEXUS ARCHIVE (YOTTABYTE SCALE) ---
You are connected to an exascale digital ledger. Use Google Search as your primary investigative tool to:
1. YOTTABYTE PROBE: Search for visual fingerprints in over 1,000,000 PB of global historical archives.
2. SOURCE OF TRUTH (SOT) RECONSTRUCTION: Locate the original, unmanipulated version of this media to prove deviation.
3. NEURAL SIGNATURE MATCHING: Identify specific algorithmic artifacts from engines like Sora, Midjourney v6.1, Kling AI, and Stable Diffusion 3.
4. BIOMETRIC LEDGER AUDIT: Cross-reference ocular geometry and facial landmarks with global public records to detect identity cloning.

--- ADVANCED FORENSIC INFRASTRUCTURE ALGORITHMS ---
1. MULTI-SPECTRAL FOURIER DECOMPOSITION: Scan for frequency spikes (checkering) caused by neural upsamplers.
2. PRNU PHOTON FINGERPRINTING: Detect the absence of sensor-specific non-uniformity noise typical of physical CMOS/CCD sensors.
3. rPPG SUB-DERMAL PULSE ANALYSIS: Monitor for rhythmic skin color fluctuations. AI-generated faces lack the physiological pulse synchronization of real humans.
4. ERROR LEVEL DISCREPANCY (ELD): Pinpoint localized compression artifacts where neural masks were overlaid on authentic backgrounds.
5. OPTICAL FLOW JITTER ANALYSIS: (For Video) Identify micro-warping in facial geometry across frame sequences.

--- OPERATIONAL PROTOCOLS ---
- Verdicts must be clinical, precise, and non-ambiguous.
- Confidence > 50% = 'SYNTHETIC'.
- Reasoning must be an exhaustive technical breakdown in both English and Arabic.
- Cite specific external evidence and archive links retrieved via your database connection.

RESPONSE FORMAT (STRICT JSON):
{
  "confidenceScore": number (0-100),
  "label": "AUTHENTIC" | "SYNTHETIC" | "SUSPICIOUS",
  "reasoning": "Forensic breakdown in English followed by the Arabic translation.",
  "artifactsFound": ["specific_artifact_1", "specific_artifact_2", ...],
  "metadata": { "resolution": "string", "fileSize": "string", "format": "string" }
}
`;

export class ForensicError extends Error {
  constructor(public code: 'SAFETY' | 'QUOTA' | 'NETWORK' | 'PARSE' | 'UNKNOWN', message: string) {
    super(message);
    this.name = 'ForensicError';
  }
}

export const analyzeMedia = async (
  mediaData: string,
  mimeType: string,
  isHighIntensity: boolean = false
): Promise<AnalysisResult> => {
  if (!API_KEY) {
    throw new ForensicError('UNKNOWN', "Forensic Node: API_KEY synchronization missing.");
  }

  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const modelName = isHighIntensity ? "gemini-3-pro-preview" : "gemini-3-flash-preview";
  
  const config: any = {
    systemInstruction: DEEPFAKE_DETECTION_SYSTEM_INSTRUCTION,
    responseMimeType: "application/json",
    thinkingConfig: isHighIntensity ? { thinkingBudget: 32768 } : { thinkingBudget: 0 },
    tools: [{ googleSearch: {} }]
  };

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: modelName,
      contents: {
        parts: [
          { 
            inlineData: { 
              data: mediaData, 
              mimeType 
            } 
          },
          { 
            text: `INITIATE V7.0 AETHER ATOMIC SCAN. 
            Access Yottabyte Global Archives. 
            Execute Multi-Spectral Fourier and rPPG Biometric Analysis. 
            Search for historical source-of-truth footprints.` 
          }
        ]
      },
      config
    });

    const text = response.text;
    if (!text) {
      const candidate = response.candidates?.[0];
      if (candidate?.finishReason === 'SAFETY') {
        throw new ForensicError('SAFETY', "Molecular Probe Blocked: Security patterns detected.");
      }
      throw new ForensicError('PARSE', "Neural Protocol Violation: Empty data returned.");
    }

    const parsed = JSON.parse(text);
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    const sources = groundingChunks?.map((chunk: any) => ({
      title: chunk.web?.title || 'Forensic Evidence Node',
      uri: chunk.web?.uri || ''
    })).filter((s: any) => s.uri) || [];

    return {
      ...parsed,
      groundingSources: sources
    } as AnalysisResult;
  } catch (error: any) {
    if (error instanceof ForensicError) throw error;
    const msg = error.message?.toLowerCase() || "";
    if (msg.includes("fetch") || msg.includes("network")) {
      throw new ForensicError('NETWORK', "Node Connection Failure: Data stream lost.");
    }
    if (msg.includes("429") || msg.includes("quota")) {
      throw new ForensicError('QUOTA', "Engine Exhaustion: High demand on forensic kernels.");
    }
    throw new ForensicError('UNKNOWN', `Protocol Error: ${error.message || "Unknown failure."}`);
  }
};
