"""Run with sudo on the VPS; add only the CV API route to the existing domain."""
from pathlib import Path
import shutil
import subprocess
import time

config = Path('/etc/nginx/sites-enabled/twohomes').resolve()
original = config.read_text()
marker = '    include /etc/nginx/snippets/vcard-assistant.conf;'
target = original.index('    server_name kinbridge.us;', original.index('    listen 443 ssl;'))
position = original.index('    location / {', target)
updated = original if marker in original else original[:position] + marker + '\n\n' + original[position:]
backup = config.with_name(config.name + '.backup-' + str(int(time.time())))
shutil.copy2(config, backup)
Path('/etc/nginx/conf.d/vcard-assistant-limits.conf').write_text('limit_req_zone $binary_remote_addr zone=cv_assistant:10m rate=10r/m;\n')
shutil.copy2(Path(__file__).with_name('nginx-location.conf'), '/etc/nginx/snippets/vcard-assistant.conf')
config.write_text(updated)
try:
    subprocess.run(['nginx', '-t'], check=True)
    subprocess.run(['systemctl', 'reload', 'nginx'], check=True)
except Exception:
    config.write_text(original)
    raise
print('API HTTPS route installed; backup:', backup)
