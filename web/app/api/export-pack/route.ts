/**
 * Export Pack API
 * 
 * Downloads selected reference images and packages them as a ZIP.
 * Images are named ref-1.jpg, ref-2.jpg, etc. for easy attachment to Claude.
 * 
 * The prompt text is generated client-side (see match/page.tsx generatePrompt).
 */

import { NextRequest, NextResponse } from 'next/server';
import JSZip from 'jszip';

// ============================================================================
// TYPES
// ============================================================================

interface MatchedBlock {
  block: {
    id: number;
    title: string | null;
    arena_url: string;
    image_url: string | null;
    one_liner: string;
  };
  relevanceNote: string;
}

interface ExportRequest {
  matches: MatchedBlock[];
  queryOneLiner: string;
  primaryId: number | null;
}

// ============================================================================
// HELPERS
// ============================================================================

async function downloadImage(url: string): Promise<Buffer | null> {
  try {
    const response = await fetch(url);
    if (!response.ok) return null;
    const arrayBuffer = await response.arrayBuffer();
    return Buffer.from(arrayBuffer);
  } catch (error) {
    console.error('Failed to download image:', url, error);
    return null;
  }
}

// ============================================================================
// API HANDLER
// ============================================================================

export async function POST(request: NextRequest) {
  try {
    const body: ExportRequest = await request.json();
    const { matches } = body;

    if (!matches || matches.length === 0) {
      return NextResponse.json({ error: 'No matches provided' }, { status: 400 });
    }

    // Create ZIP
    const zip = new JSZip();

    // Download all images in parallel
    const imageDownloads = matches.map(async (match, i) => {
      if (!match.block.image_url) return null;
      
      const buffer = await downloadImage(match.block.image_url);
      if (!buffer) return null;
      
      return { index: i + 1, buffer };
    });

    const results = await Promise.all(imageDownloads);

    // Add images to ZIP with simple names: ref-1.jpg, ref-2.jpg, etc.
    results.forEach((result) => {
      if (result) {
        zip.file(`ref-${result.index}.jpg`, result.buffer);
      }
    });

    // Generate ZIP buffer
    const zipBuffer = await zip.generateAsync({ type: 'base64' });

    return NextResponse.json({
      zip: zipBuffer,
      imageCount: results.filter(r => r !== null).length,
    });

  } catch (error: any) {
    console.error('Export pack error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
