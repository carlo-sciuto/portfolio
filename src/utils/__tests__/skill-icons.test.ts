import { describe, it, expect } from "vitest";
import { getSkillIcon } from "../skill-icons";
import { SiReact } from "react-icons/si";
import { Code2 } from "lucide-react";

describe("getSkillIcon", () => {
  it("returns correct icon and color for valid key", () => {
    const result = getSkillIcon("SiReact");
    expect(result).toEqual({ icon: SiReact, color: "#61DAFB" });
  });

  it("returns default icon for invalid key", () => {
    const result = getSkillIcon("InvalidKey");
    expect(result).toEqual({ icon: Code2, color: "currentColor" });
  });
});
