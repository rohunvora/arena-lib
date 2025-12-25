/**
 * Audit a channel's contents - Phase 1 of knowledge extraction
 */

import 'dotenv/config';
import { ArenaClient } from '../cli/arena-client.js';

const CHANNEL_SLUG = process.argv[2] || 'ux-education-a3wpxmfrzvm';

async function auditChannel() {
  const client = new ArenaClient(
    process.env.ARENA_TOKEN!,
    process.env.ARENA_USER_SLUG!,
  );

  console.log(`\n📊 Auditing channel: ${CHANNEL_SLUG}\n`);

  // Get channel info
  const channel = await client.getChannel(CHANNEL_SLUG);
  console.log(`Channel: ${channel.title}`);
  console.log(`Total blocks: ${channel.length}\n`);

  // Get all blocks
  const blocks = await client.getChannelBlocks(CHANNEL_SLUG, 200);

  // Categorize
  const byType: Record<string, typeof blocks> = {
    Image: [],
    Link: [],
    Text: [],
    Media: [],
    Attachment: [],
  };

  for (const block of blocks) {
    if (byType[block.class]) {
      byType[block.class].push(block);
    }
  }

  // Summary
  console.log('=== CONTENT BREAKDOWN ===\n');
  for (const [type, items] of Object.entries(byType)) {
    if (items.length > 0) {
      console.log(`${type}: ${items.length} blocks`);
    }
  }

  // Show links (articles) - these are the richest knowledge sources
  if (byType.Link.length > 0) {
    console.log('\n=== LINKS (Articles/Resources) ===\n');
    for (const block of byType.Link) {
      const title = block.title || block.source?.title || '(no title)';
      const url = block.source?.url || '(no url)';
      console.log(`• ${title}`);
      console.log(`  ${url}\n`);
    }
  }

  // Show text blocks
  if (byType.Text.length > 0) {
    console.log('\n=== TEXT BLOCKS ===\n');
    for (const block of byType.Text) {
      const preview = (block.content || '').slice(0, 200).replace(/\n/g, ' ');
      console.log(`• ${preview}${(block.content?.length || 0) > 200 ? '...' : ''}\n`);
    }
  }

  // Show images (might be diagrams/frameworks)
  if (byType.Image.length > 0) {
    console.log('\n=== IMAGES ===\n');
    for (const block of byType.Image) {
      const title = block.title || '(untitled)';
      const desc = block.description ? ` - ${block.description.slice(0, 100)}` : '';
      console.log(`• ${title}${desc}`);
    }
  }

  // Output raw data for further processing
  const outputPath = `./scripts/channel-audit-${CHANNEL_SLUG}.json`;
  const fs = await import('fs');
  fs.writeFileSync(outputPath, JSON.stringify({
    channel: {
      title: channel.title,
      slug: CHANNEL_SLUG,
      totalBlocks: channel.length,
    },
    summary: {
      images: byType.Image.length,
      links: byType.Link.length,
      text: byType.Text.length,
      media: byType.Media.length,
      attachments: byType.Attachment.length,
    },
    blocks: blocks,
  }, null, 2));

  console.log(`\n✅ Full data saved to: ${outputPath}`);
}

auditChannel().catch(console.error);
