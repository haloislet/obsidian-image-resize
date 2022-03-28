import resizeImagePlugin from "./main";

// console.log(clearSize('![AltText](https://url/to/image.png)'))
// console.log(clearSize('![AltText|300](https://url/to/image.png)'))
// console.log(clearSize('![](https://url/to/image.png)'))
// console.log(clearSize('![AltText|300x300](https://url/to/image.png)'))

// console.log(clearSize(`
// ![AltText|300x300](https://url/to/image.png)
// ![AltText](https://url/to/image.png)
// ![AltText|300](https://url/to/image.png)
// ![](https://url/to/image.png)
// `))

import { setSize, clearSize } from "./convert";

test("setSize test", () => {
  expect(setSize("![AltText|300x300](https://url/to/image.png)", 300)).toBe(
    "![AltText|300](https://url/to/image.png)"
  );
  expect(setSize("![AltText|300](https://url/to/image.png)", 300)).toBe(
    "![AltText|300](https://url/to/image.png)"
  );
  expect(setSize("![AltText](https://url/to/image.png)", 300)).toBe(
    "![AltText|300](https://url/to/image.png)"
  );
  expect(setSize("![](https://url/to/image.png)", 300)).toBe(
    "![300](https://url/to/image.png)"
  );
  expect(
    setSize(
      `
  ![AltText|300x300](https://url/to/image.png)
  ![AltText|300](https://url/to/image.png)
  ![AltText](https://url/to/image.png)
  ![](https://url/to/image.png)
  `,
      300
    )
  ).toBe(`
  ![AltText|300](https://url/to/image.png)
  ![AltText|300](https://url/to/image.png)
  ![AltText|300](https://url/to/image.png)
  ![300](https://url/to/image.png)
  `);
  expect(
    setSize(
      `
  ![AltText|300x300](https://url/to/image.png)
  ![AltText|300](https://url/to/image.png)
  ![AltText](https://url/to/image.png)
  ![](https://url/to/image.png)
  `,
      300,
      400
    )
  ).toBe(`
  ![AltText|300x400](https://url/to/image.png)
  ![AltText|300x400](https://url/to/image.png)
  ![AltText|300x400](https://url/to/image.png)
  ![300x400](https://url/to/image.png)
  `);
});

test("clearSize test", () => {
  expect(clearSize("![AltText|300x300](https://url/to/image.png)")).toBe(
    "![AltText](https://url/to/image.png)"
  );
  expect(clearSize("![AltText|300](https://url/to/image.png)")).toBe(
    "![AltText](https://url/to/image.png)"
  );
  expect(clearSize("![AltText](https://url/to/image.png)")).toBe(
    "![AltText](https://url/to/image.png)"
  );
  expect(clearSize("![](https://url/to/image.png)")).toBe(
    "![](https://url/to/image.png)"
  );
  expect(
    clearSize(
      `
  ![AltText|300x300](https://url/to/image.png)
  ![AltText|300](https://url/to/image.png)
  ![AltText](https://url/to/image.png)
  ![](https://url/to/image.png)
  `)
  ).toBe(`
  ![AltText](https://url/to/image.png)
  ![AltText](https://url/to/image.png)
  ![AltText](https://url/to/image.png)
  ![](https://url/to/image.png)
  `);
});
