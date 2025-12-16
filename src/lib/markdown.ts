/**
 * Enhanced markdown parser with support for tables, lists, headings, and more
 */
export const parseMarkdown = (text: string): string => {
  if (!text) return '';
  
  let html = text;
  
  // Split into lines for better processing
  const lines = html.split('\n');
  const processedLines: string[] = [];
  let inTable = false;
  let tableRows: string[] = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Check if this is a table row
    if (line.startsWith('|') && line.endsWith('|') && line.split('|').length > 2) {
      // Check if it's a separator row (contains dashes)
      if (/^[\|\s\-:]+$/.test(line)) {
        // Skip separator rows
        continue;
      }
      
      // Regular table row
      if (!inTable) {
        inTable = true;
        tableRows = [];
      }
      
      const cells = line.split('|')
        .map(cell => cell.trim())
        .filter(cell => cell.length > 0);
      
      // Determine if it's a header row (usually first row after starting table)
      const isHeader = tableRows.length === 0;
      const rowTag = isHeader ? 'thead' : 'tbody';
      const cellTag = isHeader ? 'th' : 'td';
      
      const cellHtml = cells.map(cell => {
        const cellContent = parseInlineMarkdown(cell);
        const cellClass = isHeader 
          ? 'px-4 py-3 border-b-2 border-border text-right font-semibold bg-muted/50'
          : 'px-4 py-3 border-b border-border text-right';
        return `<${cellTag} class="${cellClass}">${cellContent}</${cellTag}>`;
      }).join('');
      
      if (isHeader) {
        tableRows.push(`<thead><tr class="border-b-2 border-border">${cellHtml}</tr></thead>`);
      } else {
        if (!tableRows.some(row => row.includes('<tbody'))) {
          tableRows.push('<tbody>');
        }
        tableRows.push(`<tr class="border-b border-border hover:bg-muted/50 transition-colors">${cellHtml}</tr>`);
      }
      
      // Check if next line is not a table row
      const nextLine = i < lines.length - 1 ? lines[i + 1].trim() : '';
      if (!nextLine.startsWith('|') || /^[\|\s\-:]+$/.test(nextLine)) {
        // End of table
        if (tableRows.length > 0 && !tableRows.some(row => row.includes('</tbody>'))) {
          tableRows.push('</tbody>');
        }
        const tableHtml = `<div class="overflow-x-auto my-6 -mx-4 md:mx-0">
          <table class="w-full border-collapse border border-border rounded-lg bg-card shadow-sm">
            ${tableRows.join('\n')}
          </table>
        </div>`;
        processedLines.push(tableHtml);
        tableRows = [];
        inTable = false;
      }
      continue;
    }
    
    // If we were in a table and this line is not a table row, close the table
    if (inTable && !line.startsWith('|')) {
      if (tableRows.length > 0 && !tableRows.some(row => row.includes('</tbody>'))) {
        tableRows.push('</tbody>');
      }
      const tableHtml = `<div class="overflow-x-auto my-6 -mx-4 md:mx-0">
        <table class="w-full border-collapse border border-border rounded-lg bg-card shadow-sm">
          ${tableRows.join('\n')}
        </table>
      </div>`;
      processedLines.push(tableHtml);
      tableRows = [];
      inTable = false;
    }
    
    // Process headings (order matters - h4 before h3 before h2 before h1)
    if (line.startsWith('#### ')) {
      const content = parseInlineMarkdown(line.replace(/^#### /, ''));
      processedLines.push(`<h4 class="text-lg font-semibold mb-3 mt-6 text-foreground">${content}</h4>`);
      continue;
    }
    
    if (line.startsWith('### ')) {
      const content = parseInlineMarkdown(line.replace(/^### /, ''));
      processedLines.push(`<h3 class="text-xl font-semibold mb-4 mt-8 text-foreground">${content}</h3>`);
      continue;
    }
    
    if (line.startsWith('## ')) {
      const content = parseInlineMarkdown(line.replace(/^## /, ''));
      processedLines.push(`<h2 class="text-2xl font-bold mb-5 mt-10 text-foreground">${content}</h2>`);
      continue;
    }
    
    if (line.startsWith('# ')) {
      const content = parseInlineMarkdown(line.replace(/^# /, ''));
      processedLines.push(`<h1 class="text-3xl font-bold mb-6 mt-12 text-foreground">${content}</h1>`);
      continue;
    }
    
    // Process blockquotes
    if (line.startsWith('> ')) {
      const content = parseInlineMarkdown(line.replace(/^> /, ''));
      processedLines.push(`<blockquote class="border-r-4 border-primary pr-4 py-2 my-4 bg-muted/50 italic text-muted-foreground rounded-r-lg">${content}</blockquote>`);
      continue;
    }
    
    // Process checkmark lists (lines starting with ✅)
    if (/^✅\s*(.+)$/.test(line)) {
      const match = line.match(/^✅\s*(.+)$/);
      if (match && match[1].trim()) {
        const content = parseInlineMarkdown(match[1].trim());
        processedLines.push(`<li class="flex items-start gap-3 mb-2 text-foreground list-none">
          <span class="inline-flex items-center justify-center w-5 h-5 flex-shrink-0 mt-0.5 text-green-600 font-bold text-lg">✅</span>
          <span class="flex-1 leading-relaxed">${content}</span>
        </li>`);
        continue;
      }
    }
    
    // Process unordered lists
    if (/^(\s*)- (.+)$/.test(line)) {
      const match = line.match(/^(\s*)- (.+)$/);
      if (match) {
        const indent = match[1];
        const content = parseInlineMarkdown(match[2]);
        const level = indent ? Math.floor(indent.length / 2) : 0;
        const padding = level * 1.5;
        processedLines.push(`<li class="list-disc list-inside mb-2 text-foreground" style="padding-right: ${padding}rem">${content}</li>`);
        continue;
      }
    }
    
    // Process ordered lists
    if (/^(\s*)(\d+)\. (.+)$/.test(line)) {
      const match = line.match(/^(\s*)(\d+)\. (.+)$/);
      if (match) {
        const indent = match[1];
        const content = parseInlineMarkdown(match[3]);
        const level = indent ? Math.floor(indent.length / 2) : 0;
        const padding = level * 1.5;
        processedLines.push(`<li class="list-decimal list-inside mb-2 text-foreground" style="padding-right: ${padding}rem">${content}</li>`);
        continue;
      }
    }
    
    // Regular text line
    if (line.length > 0) {
      processedLines.push(line);
    } else {
      processedLines.push('');
    }
  }
  
  // Close any open table
  if (inTable && tableRows.length > 0) {
    if (!tableRows.some(row => row.includes('</tbody>'))) {
      tableRows.push('</tbody>');
    }
    const tableHtml = `<div class="overflow-x-auto my-6 -mx-4 md:mx-0">
      <table class="w-full border-collapse border border-border rounded-lg bg-card shadow-sm">
        ${tableRows.join('\n')}
      </table>
    </div>`;
    processedLines.push(tableHtml);
  }
  
  // Join lines and process paragraphs
  html = processedLines.join('\n');
  
  // Wrap consecutive checkmark list items in <ul>
  html = html.replace(/(<li[^>]*class="[^"]*flex items-start[^"]*">.*?<\/li>\s*)+/g, (match) => {
    return `<ul class="my-4 space-y-2 pr-0 list-none">${match}</ul>`;
  });
  
  // Wrap consecutive list items in <ul> or <ol>
  html = html.replace(/(<li[^>]*class="list-disc[^"]*">.*?<\/li>\s*)+/g, (match) => {
    return `<ul class="my-4 space-y-2 pr-4 list-disc">${match}</ul>`;
  });
  
  html = html.replace(/(<li[^>]*class="list-decimal[^"]*">.*?<\/li>\s*)+/g, (match) => {
    return `<ol class="my-4 space-y-2 pr-4 list-decimal">${match}</ol>`;
  });
  
  // Process paragraphs (text blocks separated by double newlines or single newline after HTML)
  html = html.split(/\n\n+/).map(block => {
    block = block.trim();
    if (!block) return '';
    
    // Skip if already wrapped in HTML tags
    if (/^<(h[1-6]|ul|ol|li|table|blockquote|div|thead|tbody|tr|th|td)/.test(block)) {
      return block;
    }
    
    // Process inline markdown in paragraphs
    block = parseInlineMarkdown(block);
    
    return `<p class="mb-4 leading-relaxed text-foreground">${block}</p>`;
  }).join('\n');
  
  // Clean up multiple <br /> tags
  html = html.replace(/(<br \/>\s*){2,}/g, '<br />');
  
  // Clean up empty paragraphs
  html = html.replace(/<p class="[^"]*"><\/p>/g, '');
  
  return html;
};

/**
 * Parse inline markdown (bold, italic, links, emojis)
 */
function parseInlineMarkdown(text: string): string {
  let html = text;
  
  // Bold: **text** -> <strong>text</strong> (must come before italic)
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong class="font-bold text-primary">$1</strong>');
  
  // Italic: *text* -> <em>text</em> (but not if it's part of **text**)
  html = html.replace(/(?<!\*)\*([^*\n]+?)\*(?!\*)/g, '<em class="italic">$1</em>');
  
  // Links: [text](url) -> <a>text</a>
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary hover:underline font-medium" target="_blank" rel="noopener noreferrer">$1</a>');
  
  // Emojis/checkmarks: ✅ -> styled span with better visibility (for inline use)
  // Note: Checkmarks at start of lines are handled as list items above
  html = html.replace(/✅/g, '<span class="inline-flex items-center justify-center w-5 h-5 mr-2 text-green-600 font-bold text-base align-middle">✅</span>');
  html = html.replace(/❌/g, '<span class="inline-flex items-center justify-center w-5 h-5 mr-2 text-red-600 font-bold text-base align-middle">❌</span>');
  html = html.replace(/⚠️/g, '<span class="inline-flex items-center justify-center w-5 h-5 mr-2 text-yellow-600 font-bold text-base align-middle">⚠️</span>');
  html = html.replace(/📞/g, '<span class="inline-block mr-1 text-lg">📞</span>');
  html = html.replace(/📱/g, '<span class="inline-block mr-1 text-lg">📱</span>');
  html = html.replace(/🌐/g, '<span class="inline-block mr-1 text-lg">🌐</span>');
  html = html.replace(/🎁/g, '<span class="inline-block mr-1 text-lg">🎁</span>');
  html = html.replace(/💬/g, '<span class="inline-block mr-1 text-lg">💬</span>');
  html = html.replace(/🚨/g, '<span class="inline-block mr-1 text-lg">🚨</span>');
  html = html.replace(/🌙/g, '<span class="inline-block mr-1 text-lg">🌙</span>');
  
  return html;
}
