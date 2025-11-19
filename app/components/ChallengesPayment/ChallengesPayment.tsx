import Image from "next/image";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import ChallengeSelect from "./ChallengeSelect/ChallengeSelect";

interface IChallengesPaymentProps {
  handleUpdateTotal: (total: number) => void;
}

enum Challenges {
  CHALLENGE_1 = "CHALLENGE_1",
  CHALLENGE_2 = "CHALLENGE_2",
}

const challenges = {
  [Challenges.CHALLENGE_1]: {
    title: "3 MyFinishLine challenges",
    imageSrc: "/images/payment/cat.png",
    price: 99.99,
    value: Challenges.CHALLENGE_1,
  },
  [Challenges.CHALLENGE_2]: {
    title: "6 + 1 MyFinishLine challenges",
    imageSrc: "/images/payment/cat2.png",
    price: 199.99,
    value: Challenges.CHALLENGE_2,
  },
};

const addon = {
  title: "1x Steps Booster",
  price: 9.99,
  imageSrc: "images/payment/booster.svg",
  description: "Run faster than everyone",
};

const ChallengesPayment = ({ handleUpdateTotal }: IChallengesPaymentProps) => {
  const [selectedChallenge, setSelectedChallenge] = useState<Challenges>(
    Challenges.CHALLENGE_1
  );
  const [isAddonChecked, setIsAddonChecked] = useState<boolean>(false);
  const [orderAmount, setOrderAmount] = useState<string>("1");

  const handlePressCheckbox = (event: ChangeEvent<HTMLInputElement>) => {
    setIsAddonChecked(event.target.checked);
  };

  const handleIncrementOrder = () => {
    if (orderAmount === "75") return;
    setOrderAmount((prevState) => String(+prevState + 1));
  };

  const handleDecrementOrder = () => {
    if (orderAmount === "1") return;
    setOrderAmount((prevState) => String(+prevState - 1));
  };

  const handleChangeAmount = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const sanitizedValue = value.replace(/[^0-9]/g, "");
    if (sanitizedValue === "" || Number(sanitizedValue) < 1) {
      setOrderAmount("1");
      return;
    }
    let numericValue = Number(sanitizedValue);
    if (numericValue > 75) {
      numericValue = 75;
    }
    setOrderAmount(String(numericValue));
  };

  const totalChallengeCost =
    challenges[selectedChallenge].price * Number(orderAmount);
  const total = useMemo(
    () => totalChallengeCost + (isAddonChecked ? addon.price : 0),
    [totalChallengeCost, isAddonChecked]
  );

  useEffect(() => {
    handleUpdateTotal(total);
  }, [total]);

  return (
    <section>
      <Image
        className="mx-auto w-[80%] max-h-[200px] object-contain"
        src="/images/payment/cover.png"
        width={500}
        height={408}
        sizes="100%"
        alt="Cover"
      />
      <h4 className="text-2xl font-bold mt-4">Your challenges</h4>
      <legend className="mt-2">Select one</legend>
      <fieldset className="flex gap-2 mt-2">
        <ChallengeSelect<Challenges>
          title={challenges[Challenges.CHALLENGE_1].title}
          isChecked={
            selectedChallenge === challenges[Challenges.CHALLENGE_1].value
          }
          value={Challenges.CHALLENGE_1}
          imageSrc={challenges[Challenges.CHALLENGE_1].imageSrc}
          price={challenges[Challenges.CHALLENGE_1].price}
          onChange={setSelectedChallenge}
        />
        <ChallengeSelect<Challenges>
          title={challenges[Challenges.CHALLENGE_2].title}
          isChecked={
            selectedChallenge === challenges[Challenges.CHALLENGE_2].value
          }
          value={Challenges.CHALLENGE_2}
          imageSrc={challenges[Challenges.CHALLENGE_2].imageSrc}
          price={challenges[Challenges.CHALLENGE_2].price}
          onChange={setSelectedChallenge}
        />
      </fieldset>
      <section>
        <h4 className="text-2xl font-bold mt-4">Addon</h4>
        <label
          className={`border border-neutral-300 rounded mt-4 p-4 flex items-center justify-between relative cursor-pointer transition-all ${
            isAddonChecked && "border-orange-400 shadow-xl"
          }`}
        >
          <div className="flex items-center gap-2">
            <Image
              src={addon.imageSrc}
              width={48}
              height={48}
              sizes="100%"
              alt="Addon"
            />
            <div>
              <div className="flex justify-between">
                <span className="font-bold">{addon.title}</span>
                <div className="font-bold uppercase">${addon.price}</div>
              </div>
              <p>{addon.description}</p>
            </div>
          </div>
          <input
            className="hidden"
            type="checkbox"
            checked={isAddonChecked}
            onChange={handlePressCheckbox}
          />
          <div className="border border-neutral-300 rounded w-8 h-8 relative flex items-center justify-center">
            {isAddonChecked && (
              <div className="w-5 h-5 rounded bg-orange-400" />
            )}
          </div>
        </label>
      </section>
      <section className="mt-2">
        <h4 className="text-2xl font-bold mt-4">Order summary</h4>
        <section className="border border-neutral-300 rounded mt-4">
          <section className="flex items-center justify-between p-4">
            <span className="text-sm font-semibold md:text-base">
              {challenges[selectedChallenge].title}
            </span>
            <div className="border border-neutral-300 rounded">
              <button
                className="border-r border-neutral-300 p-2 cursos-pointer"
                onClick={handleDecrementOrder}
              >
                -
              </button>
              <input
                className="p-2 text-sm text-center w-10"
                value={orderAmount}
                onChange={handleChangeAmount}
              />
              <button
                className="border-l border-neutral-300 p-2 cursos-pointer"
                onClick={handleIncrementOrder}
              >
                +
              </button>
            </div>
            <span className="text-sm">${totalChallengeCost?.toFixed(2)}</span>
          </section>
          {isAddonChecked && (
            <section className="border-t border-neutral-300 p-4 flex justify-between items-center">
              <span className="font-semibold">{addon.title}</span>
              <span className="text-sm">${addon.price}</span>
            </section>
          )}
          <section className="border-t border-neutral-300 p-4 flex justify-between items-center">
            <span className="font-bold">Total</span>
            <span className="font-bold">USD ${total?.toFixed(2)}</span>
          </section>
        </section>
      </section>
    </section>
  );
};

export default ChallengesPayment;
