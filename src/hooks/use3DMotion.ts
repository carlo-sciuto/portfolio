import { useEffect, useState, useCallback } from "react";
import {
  useMotionValue,
  useSpring,
  useTransform,
  MotionValue,
} from "framer-motion";

// Extend DeviceOrientationEvent for iOS 13+ permission
interface DeviceOrientationEventiOS extends DeviceOrientationEvent {
  requestPermission?: () => Promise<"granted" | "denied">;
}

interface Use3DMotionReturn {
  rotateX: MotionValue<string>;
  rotateY: MotionValue<string>;
  handleMouseMove: (e: React.MouseEvent<HTMLElement>) => void;
  handleMouseLeave: () => void;
  isMobile: boolean;
  permissionGranted: boolean;
  requestOrientationPermission: () => Promise<void>;
}

const GYROSCOPE_PERMISSION_KEY = "gyroscope-permission-granted";

export function use3DMotion(): Use3DMotionReturn {
  const [isMobile, setIsMobile] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(() => {
    // Load permission state from localStorage on mount
    if (typeof window !== "undefined") {
      return localStorage.getItem(GYROSCOPE_PERMISSION_KEY) === "true";
    }
    return false;
  });
  const [initialOrientation, setInitialOrientation] = useState<{
    beta: number;
    gamma: number;
  } | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 300, damping: 40 });
  const mouseY = useSpring(y, { stiffness: 300, damping: 40 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  // Detect if device is mobile/touch-enabled
  useEffect(() => {
    const checkMobile = () => {
      const mobile =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        ) ||
        (window.matchMedia("(max-width: 768px)").matches &&
          "ontouchstart" in window);
      setIsMobile(mobile);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Request permission for iOS devices (must be called from user interaction)
  const requestOrientationPermission = useCallback(async () => {
    if (
      typeof (DeviceOrientationEvent as unknown as DeviceOrientationEventiOS)
        .requestPermission === "function"
    ) {
      try {
        const permission = await (
          DeviceOrientationEvent as unknown as DeviceOrientationEventiOS
        ).requestPermission!();
        const granted = permission === "granted";
        setPermissionGranted(granted);
        // Save permission to localStorage
        localStorage.setItem(GYROSCOPE_PERMISSION_KEY, String(granted));
        if (granted) {
          // Reset calibration when permission is granted
          setInitialOrientation(null);
        }
      } catch (error) {
        console.error("Error requesting device orientation permission:", error);
        setPermissionGranted(false);
        localStorage.setItem(GYROSCOPE_PERMISSION_KEY, "false");
      }
    } else {
      // Non-iOS 13+ devices don't need permission
      setPermissionGranted(true);
      localStorage.setItem(GYROSCOPE_PERMISSION_KEY, "true");
      setInitialOrientation(null);
    }
  }, []);

  // Handle gyroscope for mobile devices
  useEffect(() => {
    if (!isMobile) return;

    const handleOrientation = (event: DeviceOrientationEvent) => {
      if (event.beta === null || event.gamma === null) return;

      // Calibrate: capture initial orientation on first reading
      if (!initialOrientation) {
        setInitialOrientation({ beta: event.beta, gamma: event.gamma });
        return;
      }

      // Calculate relative change from initial position
      const deltaBeta = event.beta - initialOrientation.beta;
      const deltaGamma = event.gamma - initialOrientation.gamma;

      // Normalize with smaller range for sensitivity (±20 degrees for natural movement)
      const normalizedBeta = Math.max(-1, Math.min(1, deltaBeta / 20));
      const normalizedGamma = Math.max(-1, Math.min(1, deltaGamma / 20));

      // Set values with moderate multiplier for smooth effect
      x.set(normalizedGamma * 0.5);
      y.set(normalizedBeta * 0.5);
    };

    // Auto-request permission on non-iOS devices
    if (permissionGranted) {
      window.addEventListener("deviceorientation", handleOrientation);
    }

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
    };
  }, [isMobile, permissionGranted, initialOrientation, x, y]);

  // Handle mouse movement for desktop
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (isMobile) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    if (isMobile) return;

    x.set(0);
    y.set(0);
  };

  return {
    rotateX,
    rotateY,
    handleMouseMove,
    handleMouseLeave,
    isMobile,
    permissionGranted,
    requestOrientationPermission,
  };
}
