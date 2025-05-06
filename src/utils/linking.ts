import { Linking } from 'react-native';
import { SnackbarOptions, SnackbarVariantEnum } from '@/providers/snackbar/snackbar-context';

export async function openExternalLink(url?: string, showSnackbar?: (opt: SnackbarOptions) => void) {
  if (url) {
    await Linking.openURL(url).catch(() => {
      showSnackbar?.({ text: 'Failed to open link', variant: SnackbarVariantEnum.ERROR });
    });
  } else {
    showSnackbar?.({ text: 'Link is not available', variant: SnackbarVariantEnum.ERROR });
  }
}
