import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet";

describe("Sheet Components", () => {
  it("renders sheet with trigger and content", async () => {
    const user = userEvent.setup();
    render(
      <Sheet>
        <SheetTrigger>Open Sheet</SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Sheet Title</SheetTitle>
            <SheetDescription>Sheet description</SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    );

    const trigger = screen.getByText("Open Sheet");
    expect(trigger).toBeInTheDocument();

    await user.click(trigger);
    expect(screen.getByText("Sheet Title")).toBeInTheDocument();
    expect(screen.getByText("Sheet description")).toBeInTheDocument();
  });

  it("renders sheet footer", async () => {
    const user = userEvent.setup();
    render(
      <Sheet>
        <SheetTrigger>Open</SheetTrigger>
        <SheetContent>
          <SheetFooter>
            <button>Save</button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    );

    await user.click(screen.getByText("Open"));
    expect(screen.getByText("Save")).toBeInTheDocument();
  });

  it("renders sheet close button", async () => {
    const user = userEvent.setup();
    render(
      <Sheet>
        <SheetTrigger>Launch</SheetTrigger>
        <SheetContent>
          <SheetClose>Close Sheet</SheetClose>
        </SheetContent>
      </Sheet>
    );

    await user.click(screen.getByText("Launch"));
    expect(screen.getByText("Close Sheet")).toBeInTheDocument();
  });

  it("renders sheet content with custom props", async () => {
    const user = userEvent.setup();
    render(
      <Sheet>
        <SheetTrigger>Custom</SheetTrigger>
        <SheetContent className="custom-sheet">
          <p>Content</p>
        </SheetContent>
      </Sheet>
    );

    await user.click(screen.getByText("Custom"));
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("renders sheet with different sides", async () => {
    const user = userEvent.setup();
    render(
      <Sheet>
        <SheetTrigger>From Right</SheetTrigger>
        <SheetContent side="right">
          <p>Right side content</p>
        </SheetContent>
      </Sheet>
    );

    await user.click(screen.getByText("From Right"));
    expect(screen.getByText("Right side content")).toBeInTheDocument();
  });

  it("renders sheet header with title and description", async () => {
    const user = userEvent.setup();
    render(
      <Sheet>
        <SheetTrigger>Info</SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Information</SheetTitle>
            <SheetDescription>Additional details here</SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    );

    await user.click(screen.getByText("Info"));
    expect(screen.getByText("Information")).toBeInTheDocument();
    expect(screen.getByText("Additional details here")).toBeInTheDocument();
  });
});
