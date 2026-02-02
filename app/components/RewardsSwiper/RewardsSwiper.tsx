import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/app/lib/hooks";
import { setUserContracts } from "@/app/lib/features/user/userSlice";
import { getUserContracts } from "@/app/lib/utils/userService";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";

import { logger } from "@/app/lib/logger";
const RewardsSwiper = () => {
  const { contracts } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadContracts = async () => {
      if (contracts.length === 0) {
        setIsLoading(true);
        try {
          const data = await getUserContracts();
          dispatch(setUserContracts(data.data));
        } catch (error) {
          logger.log(error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    loadContracts();
  }, [contracts.length, dispatch]);

  const contractsStillToGet = contracts.filter(
    (contract) => !contract.is_completed
  );

  if (isLoading) {
    return (
      <section className="pt-6 pb-4">
        <section className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4 px-4">
            <div className="h-5 w-36 bg-white/40 rounded-lg animate-pulse" />
            <div className="h-4 w-14 bg-white/40 rounded-lg animate-pulse" />
          </div>
          <div className="flex gap-3 px-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex-shrink-0 w-40 bg-white/40 backdrop-blur-xl border border-white/50 rounded-2xl p-3"
              >
                <div className="aspect-square rounded-xl bg-white/30 animate-pulse mb-3" />
                <div className="h-4 w-3/4 bg-white/30 rounded animate-pulse mb-2" />
                <div className="h-3 w-full bg-white/30 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </section>
      </section>
    );
  }

  if (contractsStillToGet.length === 0) {
    return null;
  }

  return (
    <section className="pt-6 pb-4">
      <section className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-4 px-4">
          <h4 className="font-medium text-base leading-6 text-white/90">
            Contracts in Progress
          </h4>
          <Link
            href="/app/contracts"
            className="text-sm text-white/60 hover:text-white/90 transition-colors"
          >
            See All
          </Link>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2 px-4 scrollbar-hide">
          {contractsStillToGet.map((contract, index) => {
            const contractImage = contract.image_url;
            return (
              <motion.div
                key={contract.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="flex-shrink-0 w-40"
              >
                <Link
                  href={`/app/contract/${contract.id}?data=${encodeURIComponent(JSON.stringify(contract))}`}
                  className="block h-full bg-white/40 backdrop-blur-xl border border-white/50 rounded-2xl p-3 shadow-sm hover:bg-white/50 transition-colors"
                >
                  <div className="w-full aspect-square rounded-xl overflow-hidden mb-3 bg-white/30">
                    {contractImage ? (
                      <Image
                        src={contractImage}
                        alt={contract.name}
                        width={160}
                        height={160}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Image
                          src="/icons/myfinishline-placeholder.png"
                          alt="MyFinishLine"
                          width={60}
                          height={18}
                          className="opacity-40"
                        />
                      </div>
                    )}
                  </div>
                  <h5 className="font-medium text-sm text-[#09090B] leading-5 h-10 line-clamp-2">
                    {contract.name}
                  </h5>
                  <p className="mt-1 text-xs text-[#09090B]/60 leading-4 h-8 line-clamp-2">
                    {contract.description}
                  </p>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>
    </section>
  );
};

export default RewardsSwiper;
