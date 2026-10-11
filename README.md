# Doodle & Zoe's Sparkle Adventure

A gentle, sparkly kitty adventure for little kids. Play as **Doodle**, a chubby orange-and-white tabby, with **Zoe** following along. There are no enemies, no fail state and no game over.

Play: https://howibrettyourmother.github.io/doodle-and-zoe/ (tip: Share → Add to Home Screen)

- 5 places on a pastel map: Dad's House, Mom's Apartment, KiddieKlub, The Park, Grandma Gail's
- Each place has 5 hidden sparkle stars, fish treats and one helper task. Finishing a place earns a sticker and unlocks a new dress-up item.
- Cat things: meow, purr, nap spots, making biscuits on blankets, knocking cups off tables, chasing yarn, belly-up flops, pouncing in leaf piles
- Dress-up closet for Doodle (bow, crown, tutu, cape, heart sunglasses, flower, bell collar) and Zoe (shirt, tutu and hair-bow colors)
- Controls: one low, semi-transparent row pinned to the bottom corners (LEFT/RIGHT arrows, JUMP, PAW) with the floor drawn above it so the controls never cover Doodle or Zoe; floating joystick anywhere on the left half (multi-touch). Arrows/WASD + Space + X work on a keyboard.
- Original music-box tunes; progress is saved on the device (older saves keep working).

## New in v1.3

- **Kitty friends:** one kitty waits at each place (fluffy white Persian at Dad's, purple galaxy kitty at Mom's, tiny grey kitten at KiddieKlub, calico at the Park, fancy pink-bow kitty at Grandma Gail's). Tap her or press PAW nearby to pet (purr and hearts), then pick a name from picture buttons that are read aloud. Found kitties follow Doodle in a little parade (all 5 at most, each a cached sprite so it stays fast). The kitty icon in the top bar shows whether this place's kitty has been found. You can see all of them on the 🐱 Kitties page.
- **Mini-games:** a glowing spot at each place starts a 30–45 second game you can't lose. The Park has Fish Catch, Dad's House has Laser Chase, Grandma Gail's has Yarn Stack, KiddieKlub has Kitty Dance (tap the glowing paw) and Mom's Apartment has Bubble Pop. Every game ends with confetti, stars and fish treats, and you can replay it.
- **Read-aloud voice:** uses speechSynthesis, preferring a cheerful en-US voice with a slightly higher pitch. It reads task prompts, praise, mini-game names and kitty names. The 🗣️ button on the map turns the voice on or off, and the setting is saved. Speech starts after the first tap, which iOS requires. If the voice isn't available, the game stays silent.
- **Kitty Café:** open it with 🍰 Café on the map or from the 🐾 menu during play. Pick a bowl, a treat and sprinkles, then tap Feed. Doodle and every kitty you've found munch, purr and show hearts.
- **Seasons, set automatically by the device date:** October brings pumpkins, bunting and a witch hat for Doodle. December brings snow, twinkle lights, presents and a Santa hat. On May 16, Zoe's birthday, there's cake, balloons, party hats and a spoken "Happy Birthday Zoe!" Spring adds petals and summer adds sunshine. A costume you've seen stays in the closet. To preview a season, add `?season=hal|win|bday|spring|summer`.
- **Dress-up:** new items are a Unicorn Horn, a Purple Bow Tie, a Sparkle Trail, Fairy Wings and a Heart Sweater, earned by finding kitties and playing games. Zoe gets kitty ears and more pink and purple colors. Use 👗 Closet on the map or the 🐾 menu.
- **Photo Booth:** open 📷 Photo on the map or from the 🐾 menu. Pick a backdrop, frame, poses and stickers, and drag Doodle, Zoe, the kitties and the stickers around. Tap 📸 to take the photo and then Save. On iPhone and iPad this opens the share sheet, so you can tap "Save Image" to put it in Photos. Other browsers download a PNG instead.
- **Every screen has a big Back button, and Esc works too.** In play, the 🐾 button in the top-right opens the menu (Kitties, Café, Photo Booth, Closet, Stickers), and 🗺️ goes to the map.

Single self-contained `index.html`, built by `python3 src/build.py`.
