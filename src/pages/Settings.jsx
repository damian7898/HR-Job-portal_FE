import { useEffect } from 'react';
import { Box, Card, CardContent, FormControl, InputLabel, MenuItem, Select, Snackbar, Stack, Typography } from '@mui/material';
import { useTranslation } from '../hooks/useTranslation';
import { useLanguage } from '../context/LanguageContext';
import { useState } from 'react';

function Settings() {
  const { t } = useTranslation();
  const { language, setLanguage } = useLanguage();
  const [toastOpen, setToastOpen] = useState(false);

  useEffect(() => {
    if (toastOpen) {
      const timeout = window.setTimeout(() => setToastOpen(false), 2000);
      return () => window.clearTimeout(timeout);
    }
    return undefined;
  }, [toastOpen]);

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
    setToastOpen(true);
  };

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            {t('settings.title')}
          </Typography>
          <Typography sx={{ color: 'var(--text-secondary)' }}>{t('settings.subtitle')}</Typography>
        </Box>
      </Stack>

      <Card variant="outlined" sx={{ borderRadius: 2, p: 3, backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-default)' }}>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
          {t('settings.languageSection')}
        </Typography>
        <FormControl fullWidth size="small" sx={{ maxWidth: 360 }}>
          <InputLabel id="language-select-label">{t('settings.selectLanguageLabel')}</InputLabel>
          <Select
            labelId="language-select-label"
            value={language}
            label={t('settings.selectLanguageLabel')}
            onChange={handleLanguageChange}
          >
            <MenuItem value="es">{t('settings.spanish')}</MenuItem>
            <MenuItem value="en">{t('settings.english')}</MenuItem>
          </Select>
        </FormControl>
      </Card>

      <Snackbar
        open={toastOpen}
        message={t('settings.confirmation')}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        onClose={() => setToastOpen(false)}
        autoHideDuration={2000}
      />
    </Box>
  );
}

export default Settings;
