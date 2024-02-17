import { SpelunkerModule } from 'nestjs-spelunker';
import { INestApplication } from '@nestjs/common';

export function drawMermaidGraph(app: INestApplication): string {
  const tree = SpelunkerModule.explore(app);
  const root = SpelunkerModule.graph(tree);
  const edges = SpelunkerModule.findGraphEdges(root);
  const mermaidEdges = edges.map(({ from, to }) => `  ${from.module.name}-->${to.module.name}`);

  return `graph LR\n${mermaidEdges.join('\n')}`;
}
