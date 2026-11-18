/**
 * Neural voices used for the pre-recorded audio (scripts/gen_audio.py).
 * Format: "voice|pitch|rate" — pitch/rate tweaks make characters that share a base voice sound different.
 */
export const NARRATOR = 'de-DE-TanjaNeural|+0Hz|+0%';

export const CHARACTER_VOICE: Record<string, string> = {
  lena: 'de-DE-TanjaNeural|+0Hz|+0%',
  karim: 'de-DE-ChristophNeural|+0Hz|+0%',
  weber: 'de-DE-TanjaNeural|-12Hz|-8%',
  bauer: 'de-CH-JanNeural|+0Hz|+0%',
  mia: 'de-AT-IngridNeural|+0Hz|+0%',
  jonas: 'de-AT-JonasNeural|+0Hz|+0%',
  yilmaz: 'de-CH-LeniNeural|+0Hz|+0%',
  paul: 'de-DE-ChristophNeural|-14Hz|-4%',
  amira: 'de-DE-TanjaNeural|+14Hz|+6%',
};

export const audioKey = (voice: string, text: string) => `${voice}#${text.trim()}`;
