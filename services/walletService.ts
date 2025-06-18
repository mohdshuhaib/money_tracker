import { ResponseType, WalletType } from "@/types";
import { uploadFileToCloudinary } from "./imageService";
import { collection, deleteDoc, doc, setDoc } from "firebase/firestore";
import { firestore } from "@/config/firebase";

export const createOrUpdateWallet = async (
  walletData: Partial<WalletType>
): Promise<ResponseType> => {
  try {
    let walletToSave = {...walletData}

    if(walletData.image){
          const imageUploadRes = await uploadFileToCloudinary(walletData.image, 'wallets')
          if(!imageUploadRes.success){
            return {success: false, msg: imageUploadRes.msg || 'Failed to upload wallet icon'}
          }
          walletToSave.image = imageUploadRes.data
        }

        if(walletData?.id){
          walletToSave.amount = 0;
          walletToSave.totalIncome = 0;
          walletToSave.totalExpenses = 0;
          walletToSave.created = new Date()
        }

        const walletRef = walletData?.id ? doc(firestore, 'wallets', walletData?.id): doc(collection(firestore, 'wallets'))
        await setDoc(walletRef, walletToSave, {merge: true})
        return {success: true, data: {...walletToSave, id: walletRef.id}}

  } catch (error: any) {
    return {success: false, msg: error.message || 'Something went wrong'}
  }
}

export const deleteWallet = async (walletId: string): Promise<ResponseType> => {
  try {
    const walletRef = doc(firestore, 'wallets', walletId)
    await deleteDoc(walletRef)

    return {success: true, msg: 'Wallet deleted successfully'}
  } catch (err: any) {
    return {success: false, msg: err.message || 'Something went wrong'}
  }
}