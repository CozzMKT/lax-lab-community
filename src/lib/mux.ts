// Mux video hosting utilities
// Docs: https://docs.mux.com

// Mux playback URL format
export function getMuxPlaybackUrl(playbackId: string) {
  return `https://stream.mux.com/${playbackId}.m3u8`;
}

export function getMuxThumbnailUrl(playbackId: string, time = 0) {
  return `https://image.mux.com/${playbackId}/thumbnail.jpg?time=${time}`;
}

export function getMuxAnimatedGif(playbackId: string) {
  return `https://image.mux.com/${playbackId}/animated.gif`;
}

// Map local drill video filenames → Mux playback IDs
// After uploading to Mux, replace the empty strings with real playback IDs
// Dashboard: https://dashboard.mux.com
export const MUX_DRILL_IDS: Record<string, string> = {
  "ll-one-knee-pop-2": "",           // One Knee Pop Shooting
  "f5-standing-toss-shooting": "",   // Standing Toss Shooting
  "f5-layup-shooting-abovemid": "",  // Layup Shooting Above/Mid
  "one-arm-snap-shooting": "",       // One Arm Snap Shooting
  "hand-exchange-question-mark": "", // Hand Exchange Question Mark
  "gather-otr-shooting": "",         // Gather OTR Shooting
  "fade-shooting-ll": "",            // Fade Shooting
  "spin-fire": "",                   // Spin & Fire
  "jumpshot-shooting-ll": "",        // Jumpshot Shooting
  "btc-split-up-the-hash-2": "",     // BTC Split Up the Hash
  "shoulder-lean-ll": "",            // Shoulder Lean
  "heat-feet-around-the-cone-sideways": "", // Heat Feet Around Cone Sideways
  "heat-feet-around-the-cone-forward": "",  // Heat Feet Around Cone Forward
  "half-turns-cod-w-stick": "",      // Half Turns COD W/ Stick
  "half-turns-cod-no-stick-ll": "",  // Half Turns COD No Stick
  "cod-carousel-ll": "",             // Foot in the Ground, COD Carousel
  "atc-split-dodge-alley": "",       // ATC Split Dodge Alley
  "fake-wrap": "",                   // Fake and Wrap
  "dip-dunk-ll": "",                 // Dip & Dunk
};
