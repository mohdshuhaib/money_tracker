import Button from '@/components/Button'
import { useAuth } from '@/contexts/authContext'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { WalletType } from '@/types';
import { Alert, StyleSheet } from 'react-native';
import { colors, spacingX, spacingY } from '@/constants/theme';
import { scale, verticalScale } from '@/utils/styling';
import Typo from '@/components/Typo';
import { ScrollView, View } from 'react-native';
import Input from '@/components/Input';
import BackButton from '@/components/BackButton';
import ModalWrapper from '@/components/ModalWrapper';
import Header from '@/components/Header';
import { useEffect, useState } from 'react';
import ImageUpload from '@/components/ImageUpload';
import { createOrUpdateWallet, deleteWallet } from '@/services/walletService';
import * as Icons from 'phosphor-react-native'

const WalletModal = () => {
  const { user, updateUserData } = useAuth()
  const [wallet, setWallet] = useState<WalletType>({
    name: '',
    image: null
  })

  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const oldWallet: { name: string; image: string; id: string } = useLocalSearchParams()
  useEffect(() => {
    if(oldWallet?.id) {
      setWallet({
        name: oldWallet?.name,
        image: oldWallet?.image
      })
    }
  },[])

    const onSubmit = async () => {
        let { name, image } = wallet
        if(!name.trim() || !image) {
          Alert.alert('Wallet', 'Please fill all the fields')
          return
        }

        const data: WalletType = {
          name,
          image,
          uid: user?.uid
        }
        if(oldWallet?.id) data.id = oldWallet?.id

        setLoading(true)
        const res = await createOrUpdateWallet(data)
        setLoading(false)
        if(res.success){
          router.back()
        }else {
          Alert.alert('Wallet', res.msg)
        }
      }

      const onDelete = async () => {
        if(!oldWallet?.id) return
        setLoading(true)
        const res = await deleteWallet(oldWallet?.id)
        setLoading(false)
        if(res.success){
          router.back()
        }else {
          Alert.alert('Wallet', res.msg)
        }
      }

      const showDeleteAlert = () => {
        Alert.alert('Delete Wallet', 'Are you sure you want to delete this wallet? \nThis action will remove all the transactions associated with this wallet.',
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel'
            },
            {
              text: 'Delete',
              onPress: () => onDelete(),
              style: 'destructive'
            }
          ]
        )
      }

      return (
    <ModalWrapper>
      <View style={styles.container}>
        <Header
          title={oldWallet?.id ? 'Edit Wallet' : 'New Wallet'}
          leftIcon={<BackButton/>}
          style={{ marginBottom: spacingY._10}}
        />
        {/* form */}
        <ScrollView contentContainerStyle={styles.form}>
          <View style={styles.inputContainer}>
            <Typo color={colors.neutral200}>
              Wallet Name
            </Typo>
            <Input
              placeholder='Salary'
              value={wallet.name}
              onChangeText={(value) => setWallet({ ...wallet, name: value })}
            />
          </View>
          <View style={styles.inputContainer}>
            <Typo color={colors.neutral200}>
              Wallet Icon
            </Typo>
            <ImageUpload
              file={wallet.image}
              onSelect={(file) => setWallet({...wallet, image: file})}
              onClear={() => setWallet({...wallet, image: null})}
              placeholder='Upload Image'
            />
          </View>
        </ScrollView>
        </View>

        <View style={styles.footer}>
          {
            oldWallet?.id && !loading && (
              <Button style={{ backgroundColor: colors.rose, paddingHorizontal: spacingX._15}} onPress={showDeleteAlert}>
                <Icons.Trash
                  color={colors.white}
                  size={verticalScale(24)}
                  weight='bold'
                />
              </Button>
            )
          }
        <Button onPress={onSubmit} loading={loading} style={{ flex: 1 }}>
          <Typo color={colors.black} fontWeight={'700'}>
            {
              oldWallet?.id ? 'Update Wallet' : 'Create Wallet'
            }
          </Typo>
        </Button>
      </View>
    </ModalWrapper>
  )
}

export default WalletModal

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: spacingY._20,
    // paddingVertical: spacingY._30
  },

  footer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: spacingX._20,
    gap: scale(12),
    paddingTop: spacingY._15,
    borderTopColor: colors.neutral700,
    marginBottom: spacingY._5,
    borderTopWidth: 1,
  },

  form: {
    gap: spacingY._30,
    marginTop: spacingY._15
  },

  avatarContainer: {
      position: 'relative',
      alignSelf: 'center',
    },

    avatar: {
      alignSelf: 'center',
      backgroundColor: colors.neutral300,
      height: verticalScale(135),
      width: verticalScale(135),
      borderRadius: 200,
      borderWidth: 1,
      borderColor: colors.neutral500,
      // overflow: 'hidden',
      // position: 'relative'
    },

  editIcon: {
    position: 'absolute',
    bottom: spacingY._5,
    right: spacingY._7,
    borderRadius: 100,
    backgroundColor: colors.neutral100,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 0},
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
    padding: spacingY._7
  },

  inputContainer: {
    gap: spacingY._20
  }
})