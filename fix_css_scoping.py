
import re
import os

def fix_css_file(file_path):
    if not os.path.exists(file_path):
        print(f"File not found: {file_path}")
        return

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Pattern 1: Fix @keyframes and @media prefixed with .page-*
    # Regex look for .page-something followed by @
    # We want to remove ".page-something "
    content = re.sub(r'(\.page-[a-z0-9-]+)\s+(@)', r'\2', content)

    # Pattern 2: Fix keyframe selectors (0%, 100%, from, to) prefixed with .page-*
    # This is trickier because we don't want to break normal selectors.
    # But normal selectors don't usually start with a number or "from"/"to" (unless it's a tag name, but from/to aren't tags).
    # We will assume if .page-XYZ is followed by a digit or 'from' or 'to', it's a keyframe selector.
    
    def replacer(match):
        prefix = match.group(1)
        rest = match.group(2)
        # If rest starts with digit or from/to, remove prefix
        if re.match(r'^[0-9]|from\b|to\b', rest.strip()):
            return rest
        return match.group(0) # No change

    # We iterate line by line for safer context or use regex on multiline?
    # Keyframe selectors usually have curly brace after.
    # Regex: \.page-[a-z0-9-]+\s+([0-9.]+%|from|to)\s*\{
    
    content = re.sub(r'\.page-[a-z0-9-]+\s+([0-9.]+%|from|to)', r'\1', content)
    
    # Also handle comma separated keyframes? e.g. .page-x 0%, .page-x 100%
    # The previous regex handles one instance. Global replacement should handle all if distinct.
    
    # Extra check for .page-* followed by @media? Handled by Pattern 1.

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"Fixed {file_path}")

files_to_fix = [
    r"c:\Users\Deepitha\OneDrive\Desktop\Intellina_event\unified\src\pages\Contact\Contact.css",
    r"c:\Users\Deepitha\OneDrive\Desktop\Intellina_event\unified\src\pages\Passes\Passes.css",
    r"c:\Users\Deepitha\OneDrive\Desktop\Intellina_event\unified\src\pages\Members\Members.css",
    r"c:\Users\Deepitha\OneDrive\Desktop\Intellina_event\unified\src\pages\Developers\Developers.css",
    r"c:\Users\Deepitha\OneDrive\Desktop\Intellina_event\unified\src\pages\Home\Home.css" # Just in case
]

for fp in files_to_fix:
    fix_css_file(fp)
