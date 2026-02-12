import GlobeIcon from '@/components/icons/Globe';
import { ActionButton, Page, StyledText } from '@/components/ui';
import { InputField } from '@/components/ui/InputField';
import { Language } from '@/domain/enums/language.enum';
import { useUser } from '@/queries/user';
import { useForm } from '@tanstack/react-form';
import { useTranslation } from 'react-i18next';
import { ScrollView, View, Image } from 'react-native';
import packageJson from '../../package.json';
import { useCreateSupportRequest } from '@/queries/support';
import { useState } from 'react';

const version = packageJson.version;

export default function SupportScreen() {
  const [showSuccess, setShowSuccess] = useState(false);
  const { t } = useTranslation();

  const { data: user } = useUser();
  const { mutateAsync: sendSupportRequest } = useCreateSupportRequest();

  const form = useForm({
    defaultValues: { email: user?.email && !user.email.includes('privaterelay') ? user.email : '', message: '' },
    onSubmit: async ({ value }) => {
      if (!user) return;

      const body = {
        email: value.email,
        userId: user.id,
        appVersion: version,
        message: value.message,
      };

      await sendSupportRequest(body).then(() => {
        form.reset();
        setShowSuccess(true);
      });
    },
  });

  return (
    <Page scrollEnabled={false}>
      <ScrollView>
        <StyledText className="text-gray-500 mb-4">{t('screen.support.description')}</StyledText>

        {showSuccess && (
          <View className="p-4 border-primary-600 bg-primary-100 rounded-lg">
            <StyledText className="text-primary-900 text-lg" weight="black">
              {t('screen.support.notice.success.title')}
            </StyledText>
            <StyledText className="text-primary-500">{t('screen.support.notice.success.description')}</StyledText>
          </View>
        )}

        <StyledText className="mt-4 ml-4 mb-2" weight="bold">
          {t('screen.support.form.email.label')}
        </StyledText>
        <form.Field name="email">
          {field => (
            <InputField
              value={field.state.value}
              onChangeText={text => form.setFieldValue('email', text)}
              placeholder={t('screen.support.form.email.placeholder')}
              error={field.state.meta.errors?.join(', ')}
            />
          )}
        </form.Field>

        <StyledText className="mt-4 ml-4 mb-2" weight="bold">
          {t('screen.support.form.message.label')}
        </StyledText>
        <form.Field name="message">
          {field => (
            <InputField
              value={field.state.value}
              onChangeText={text => form.setFieldValue('message', text)}
              placeholder={t('screen.support.form.message.placeholder')}
              multiline
              error={field.state.meta.errors?.join(', ')}
            />
          )}
        </form.Field>
      </ScrollView>

      <form.Subscribe selector={state => [state.canSubmit, state.isSubmitting]}>
        {([canSubmit, isSubmitting]) => (
          <ActionButton
            size="large"
            text={t('screen.support.action.submit')}
            isLoading={isSubmitting}
            disabled={!canSubmit}
            onPress={() => form.handleSubmit()}
          />
        )}
      </form.Subscribe>
    </Page>
  );
}

const getFlagIcon = (language: Language) => {
  switch (language) {
    case 'en':
      return <Image className="w-8 h-5 rounded-xs" source={require('../../assets/flags/en.webp')} />;
    case 'fr':
      return <Image className="w-8 h-5 rounded-xs" source={require('../../assets/flags/fr.webp')} />;
    case 'nl':
      return <Image className="w-8 h-5 rounded-xs" source={require('../../assets/flags/nl.webp')} />;
    case 'es':
      return <Image className="w-8 h-5 rounded-xs" source={require('../../assets/flags/es.webp')} />;
    case 'de':
      return <Image className="w-8 h-5 rounded-xs" source={require('../../assets/flags/de.webp')} />;
    default:
      return <GlobeIcon width={24} height={24} color="#32675e" />;
  }
};
