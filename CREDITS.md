# Sound credits

All animal sounds are real recordings released as **CC0 1.0 (public domain dedication)** or **Public Domain**. They were trimmed, normalized and converted to mono mp3. Voice lines are generated offline with Piper TTS.

| Clip | Source | Author | License |
|---|---|---|---|
| meow1 | "Meow Cat #2" (#1890), https://bigsoundbank.com/sound-1890 | Joseph SARDIN, BigSoundBank | CC0 |
| meow2 | "Little meow #1" (#0494), https://bigsoundbank.com/sound-0494 | Joseph SARDIN, BigSoundBank | CC0 |
| meow3 | "Maullido de gata hembra joven", Wikimedia Commons | George Miquilena | CC0 |
| meow4 | "Small mewing" (#0098), https://bigsoundbank.com/sound-0098 | Joseph SARDIN, BigSoundBank | CC0 |
| meow5 | "Meow of a pleading cat", Wikimedia Commons | User:Heismark | Public domain |
| purr | "Cat Purr" (#0436), https://bigsoundbank.com/sound-0436 | Joseph SARDIN, BigSoundBank | CC0 |
| a_duck | Ducks (#0276), https://bigsoundbank.com/sound-0276 | Joseph SARDIN, BigSoundBank | CC0 |
| a_owl | "Tawny Owl #3" (#3459), https://bigsoundbank.com/sound-3459 | Joseph SARDIN, BigSoundBank | CC0 |
| a_dog | Sled dog (#2955), https://bigsoundbank.com/sound-2955 | Joseph SARDIN, BigSoundBank | CC0 |
| a_frog | "One frog" (#0819), https://bigsoundbank.com/sound-0819 | Joseph SARDIN, BigSoundBank | CC0 |

BigSoundBank license: https://bigsoundbank.com/droits.html (CC0). Wikimedia files: https://commons.wikimedia.org

## Hub intro soundtracks (hub/zi_*.mp3)
There is one pre-mixed track per intro theme: stars, rainbow, castle, fireworks, unicorn, Z-O-E, and birthday. Each is normalized to about -18 LUFS with true peak under -1.5 dBTP and played with WebAudio after "Tap to start!". Tapping fades it out. The "Hi Zoe!" line plays only after the track ends. If nobody taps, the intro stays silent.

**Music:** "Sparkle Hop" is an original theme composed for this hub. It was written programmatically as MIDI (kids-hubs/music/compose.py) and rendered with the FluidR3_GM SoundFont (MIT license) through FluidSynth. Every theme uses the same glockenspiel hook with a different arrangement (celesta, glockenspiel/flute, trumpet + timpani, pizzicato + brass, harp/flute + woodblock gallop, xylophone, trumpet party).

Letter "pops" and star "pings" are synthesized.

| Sound | Source | License |
|---|---|---|
| Sparkle sweeps (wind chimes) | https://commons.wikimedia.org/wiki/File:Windchimes.ogg (Esc861) | Public domain |
| Firework pops | https://commons.wikimedia.org/wiki/File:Fireworks_piece.ogg | Public domain |
| Unicorn whinny (horse) | https://commons.wikimedia.org/wiki/File:Wiehern.ogg | Public domain |
| Unicorn gallop | https://commons.wikimedia.org/wiki/File:Six_Horses_Galloping_By.ogg (Freesound community) | CC0 |

Animal sounds are never spoken by the TTS voice: lines/phrases contain only the words, and the real recording above (meow1-5, purr, a_duck, a_dog, a_frog, a_owl) plays right after the speech (no overlap). The hub greeting z_hi uses meow1.

## Game voice and sound effects (2026-11-27 update)
- Spoken phrase clips in `play/v/` are pre-rendered with the Microsoft Edge neural voice en-US-JennyNeural (whole sentences, loudness-normalized to about -16 LUFS). Numbers 1-30 use the ElevenLabs Belle voice, the same voice as the other built-in game lines.
- Sound effects `src/clips/x_*.mp3` (embedded in play/index.html):
  - boing, pop, click, whoosh, hop, land, splash, treat, check, chime, sticker, plane: from the game's own `play/audio/sfx` pack. plane is the whoosh, slowed down.
  - plop, beep: Kenney "Interface Sounds" (CC0, kenney.nl).
  - rustle, pat, knock, munch, crackle: Kenney "Impact Sounds" (CC0). rustle also uses cloth2 from Kenney "RPG Audio" (CC0).
  - shutter: Kenney "RPG Audio" metalClick (CC0).
  - squeak: "Rubber duck toy squeaking.wav" by panmaterac (freesound 201285, CC0).
  - honk: "Honk! (Vintage Bicycle Horn)" by Breviceps (freesound 468441, CC0).
  - Music Maker bell, piano and kick: glockenspiel by cabled_mess (freesound 348924), piano C5 by pinkyfinger (freesound 68441), and kick by DWSD (freesound 171104). All CC0, via Silly Beat Band.
