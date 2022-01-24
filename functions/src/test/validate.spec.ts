import { assert } from "chai";
import { describe, it } from "mocha";
import { validate } from "../validate";
import * as t from "io-ts";
import { isLeft, isRight } from "fp-ts/lib/Either";

describe("Validate with io-ts codecs", function () {
  it("should return a value when the input is valid", function () {
    const input = "test";
    const result = validate(t.string)(input);

    assert.isTrue(isRight(result));
    if (isRight(result)) {
      assert.isString(result.right);
    }
  });

  it("should return errors when the input is invalid", function () {
    const input = 0;
    const result = validate(t.string)(input);

    assert.isTrue(isLeft(result));
    if (isLeft(result)) {
      assert.isArray(result.left);
    }
  });
});
