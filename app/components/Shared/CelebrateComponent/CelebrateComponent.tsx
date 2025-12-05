import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

const CelebrationComponent = () => {
  const [LOADED, setLoaded] = useState(false);

  const { width, height } = useWindowSize();

  useEffect(() => {
    setLoaded(true);
  }, []);

  return LOADED && <Confetti width={width} height={height} />;
};

export default CelebrationComponent;
