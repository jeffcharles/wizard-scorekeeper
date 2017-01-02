#!/usr/bin/env bash

set -euo pipefail

convert -background '#3F51B5' -fill '#eee' -font Arial -size 192x192 -gravity center -border 15x15 -bordercolor '#3F51B5' label:WS favicon.png
convert favicon.png \( +clone -alpha extract -draw 'fill black polygon 0,0 0,15 15,0 fill white circle 15,15 15,0' \( +clone -flip \) -compose Multiply -composite \( +clone -flop \) -compose Multiply -composite \) -alpha off -compose CopyOpacity -composite favicon.png
