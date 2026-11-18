"""Render scripts/audio-jobs.json into public/audio/*.mp3 with neural voices (edge-tts).

Usage:  .venv/bin/python scripts/gen_audio.py      (only renders missing clips)
"""
import asyncio, hashlib, json, os, sys
import edge_tts

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, 'public', 'audio')
os.makedirs(OUT, exist_ok=True)
jobs = json.load(open(os.path.join(ROOT, 'scripts', 'audio-jobs.json')))
manifest_path = os.path.join(OUT, 'manifest.json')
manifest = json.load(open(manifest_path)) if os.path.exists(manifest_path) else {}

def name(voice, text):
    return hashlib.sha1(f'{voice}#{text}'.encode()).hexdigest()[:14] + '.mp3'

async def render(job, sem, stats):
    voice, pitch, rate = job['voice'].split('|')
    key = f"{job['voice']}#{job['text']}"
    fn = name(job['voice'], job['text'])
    path = os.path.join(OUT, fn)
    if os.path.exists(path) and os.path.getsize(path) > 0:
        manifest[key] = fn; return
    async with sem:
        for attempt in range(4):
            try:
                await edge_tts.Communicate(job['text'], voice, pitch=pitch, rate=rate).save(path)
                manifest[key] = fn; stats['ok'] += 1
                if stats['ok'] % 50 == 0: print(f"{stats['ok']} rendered", flush=True)
                return
            except Exception as e:  # network hiccup / throttling
                await asyncio.sleep(2 * (attempt + 1))
        stats['fail'] += 1; print('FAILED:', job['text'][:60], file=sys.stderr)

async def main():
    sem = asyncio.Semaphore(10)
    stats = {'ok': 0, 'fail': 0}
    await asyncio.gather(*(render(j, sem, stats) for j in jobs))
    keys = {f"{j['voice']}#{j['text']}" for j in jobs}
    clean = {k: v for k, v in manifest.items() if k in keys}
    json.dump(clean, open(manifest_path, 'w'), ensure_ascii=False)
    print(f"done: {stats['ok']} new, {stats['fail']} failed, {len(clean)} in manifest")

asyncio.run(main())
