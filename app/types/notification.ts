export interface ContractUnlockedData {
  contract_id: number;
  contract_name: string;
}

export interface INotification {
  id: number;
  user_id: number;
  type: "contract_unlocked";
  data: ContractUnlockedData;
  created_at: string;
}
