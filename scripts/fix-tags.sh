#!/bin/bash

# This script patches generated contentlayer files and updates the tag data.

# Define the files to patch
BLOG_INDEX="./.contentlayer/generated/Blog/_index.mjs"
AUTHORS_INDEX="./.contentlayer/generated/Authors/_index.mjs"

# Check if the files exist before trying to patch them
if [ -f "$BLOG_INDEX" ]; then
    sed -i.bak "s/assert { type: 'json' }/with { type: 'json' }/g" "$BLOG_INDEX"
    rm -f "$BLOG_INDEX.bak"
    echo "Patched Blog index."
fi

if [ -f "$AUTHORS_INDEX" ]; then
    sed -i.bak "s/assert { type: 'json' }/with { type: 'json' }/g" "$AUTHORS_INDEX"
    rm -f "$AUTHORS_INDEX.bak"
    echo "Patched Authors index."
fi

# Run the tag update script
node ./scripts/postContentlayer.mjs

echo "Contentlayer files patched and tags updated."
