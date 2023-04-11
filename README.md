# Codequest Browser Extension

Add code snippets to your WhatsApp messages.

## Use markdown syntax

Write a markdown code block in your message:

<pre><code>```rust
fn main() {
    for x in 1..=100 {
        match (x % 3, x % 5) {
            (0, 0) => println!("FizzBuzz"),
            (0, _) => println!("Fizz"),
            (_, 0) => println!("Buzz"),
            _ => println!("{}", x),
        }
    }
}
```</code></pre>

## Use the CodeQuest Website

Upload your code to [https://codequest.frank-mayer.io](https://codequest.frank-mayer.io) and share a link to the rendered image.

## Build

```bash
npm run build
```

## Installation

### Chrome

1. At the top right, click `More ⋮` > `More tools` > `Extensions` or go to [chrome://extensions](chrome://extensions).
2. Enable `Developer mode` at the top right corner.
3. Click `Load unpacked` at the top left corner.
4. Choose this repository.
