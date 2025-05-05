import findAnagrams from 'find-anagrams';

/**
 * Groups anagrams using the `find-anagrams` package.
 */
export function groupAnagramsByLibrary(words) {
  return findAnagrams(words);
}

/**
 * Groups words using graph-based traversal on pair map.
 */
export function groupAnagramsByGraph(pairsMap) {
  const pairs = Object.values(pairsMap).flat();
  const graph = new Map();

  for (const [a, b] of pairs) {
    if (!graph.has(a)) graph.set(a, []);
    if (!graph.has(b)) graph.set(b, []);
    graph.get(a).push(b);
    graph.get(b).push(a);
  }

  const visited = new Set();
  const groups = [];

  for (const word of graph.keys()) {
    if (!visited.has(word)) {
      const stack = [word];
      const group = [];

      while (stack.length > 0) {
        const current = stack.pop();
        if (!visited.has(current)) {
          visited.add(current);
          group.push(current);
          for (const neighbor of graph.get(current)) {
            if (!visited.has(neighbor)) {
              stack.push(neighbor);
            }
          }
        }
      }

      groups.push(group.sort());
    }
  }

  return groups;
}

/**
 * Merge both graph-based and sorted-character groups.
 */
export function mergeAnagramAndGraphGroups(pairsMap) {
  const allWords = [...new Set(Object.values(pairsMap).flat().flat())];
  const anagramGroups = groupAnagramsByLibrary(allWords);
  const graphGroups = groupAnagramsByGraph(pairsMap);

  const allGroups = [...anagramGroups, ...graphGroups];
  const wordToGroup = new Map();
  const finalGroups = [];

  for (const group of allGroups) {
    let mergeIndex = null;
    for (const word of group) {
      if (wordToGroup.has(word)) {
        mergeIndex = wordToGroup.get(word);
        break;
      }
    }

    if (mergeIndex === null) {
      const index = finalGroups.length;
      finalGroups.push(new Set(group));
      group.forEach(w => wordToGroup.set(w, index));
    } else {
      const existing = finalGroups[mergeIndex];
      group.forEach(w => {
        if (!existing.has(w)) {
          existing.add(w);
          wordToGroup.set(w, mergeIndex);
        }
      });
    }
  }

  return finalGroups.map(g => [...g].sort());
}
