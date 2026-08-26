import { it, expect, describe } from "vitest";
import { formatMoney } from "./money";

describe("formatMoney", () => {
  it("formats money correctly", () => {
    expect(formatMoney(12345)).toBe("123.45");
    expect(formatMoney(0)).toBe("0.00");
  });
});
