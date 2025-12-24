import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  useColorScheme,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
  Modal,
  FlatList,
} from 'react-native';
import { getTheme } from '../config/theme';
import { useAppStore } from '../store/appStore';
import { switchVendor, configService } from '../services/ConfigService';

const LoginScreen: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [selectedConfig, setSelectedConfig] = useState('myschool');
  const [showConfigModal, setShowConfigModal] = useState(false);
  const isDarkMode = useColorScheme() === 'dark';
  const theme = getTheme(isDarkMode);
  const { login } = useAppStore();

  // Available configurations
  const configOptions = [
    { id: 'myschool', name: 'mySchool Academy', type: 'School' },
    { id: 'sunshine', name: 'Sunshine International School', type: 'School' },
    { id: 'pharmacy', name: 'HealthPlus Pharmacy', type: 'Pharmacy' },
  ];

  // Test credentials
  const TEST_USERNAME = 'test';
  const TEST_PASSWORD = 'test';

  const handleLogin = () => {
    if (!username.trim() || !password.trim()) {
      Alert.alert('Error', 'Please enter both username and password');
      return;
    }

    if (username === TEST_USERNAME && password === TEST_PASSWORD) {
      // Call login immediately so navigation doesn't depend on the Alert button
      console.log('[LoginScreen] credentials OK — calling login()');
      login();
      setUsername('');
      setPassword('');
      Alert.alert(
        'Success',
        `Login successful! Using ${
          configOptions.find(c => c.id === selectedConfig)?.name
        }`,
      );
    } else {
      Alert.alert('Error', 'Invalid username or password');
    }
  };

  const handleConfigSelect = (configId: string) => {
    setSelectedConfig(configId);
    setShowConfigModal(false);
    // Switch vendor configuration before login
    switchVendor(configId);
  };

  const homeData = configService.getScreenData('home') as {
    organisationName: string;
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.select({ ios: 0, android: 20 })}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View
            style={[
              styles.container,
              { backgroundColor: theme.colors.background },
            ]}
          >
            {/* Logo */}
            <View style={styles.logoContainer}>
              <View
                style={[
                  styles.logoPlaceholder,
                  { backgroundColor: theme.colors.primary },
                ]}
              >
                <Text style={{ fontSize: 48 }}>📚</Text>
              </View>
              <Text style={[styles.appTitle, { color: theme.colors.text }]}>
                {homeData.organisationName}
              </Text>
            </View>

            {/* Login Form */}
            <View style={styles.formContainer}>
              <Text style={[styles.welcomeText, { color: theme.colors.text }]}>
                Welcome Back
              </Text>

              {/* Username Input */}
              <View style={styles.inputContainer}>
                <Text style={[styles.label, { color: theme.colors.text }]}>
                  Username
                </Text>
                <TextInput
                  style={[
                    styles.input,
                    {
                      backgroundColor: theme.colors.surface,
                      color: theme.colors.text,
                      borderColor: theme.colors.border,
                    },
                  ]}
                  placeholder="Enter your username"
                  placeholderTextColor={theme.colors.textSecondary}
                  value={username}
                  onChangeText={setUsername}
                  editable={true}
                />
              </View>

              {/* Password Input */}
              <View style={styles.inputContainer}>
                <Text style={[styles.label, { color: theme.colors.text }]}>
                  Password
                </Text>
                <TextInput
                  style={[
                    styles.input,
                    {
                      backgroundColor: theme.colors.surface,
                      color: theme.colors.text,
                      borderColor: theme.colors.border,
                    },
                  ]}
                  placeholder="Enter your password"
                  placeholderTextColor={theme.colors.textSecondary}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={true}
                />
              </View>

              {/* Test Credentials Helper Text */}
              <Text
                style={[
                  styles.helperText,
                  { color: theme.colors.textSecondary },
                ]}
              >
                Test: username: <Text style={styles.bold}>test</Text>, password:{' '}
                <Text style={styles.bold}>test</Text>
              </Text>

              {/* Config Selector */}
              <View style={styles.inputContainer}>
                <Text style={[styles.label, { color: theme.colors.text }]}>
                  Configuration
                </Text>
                <TouchableOpacity
                  style={[
                    styles.input,
                    {
                      backgroundColor: theme.colors.surface,
                      borderColor: theme.colors.border,
                      justifyContent: 'center',
                    },
                  ]}
                  onPress={() => setShowConfigModal(true)}
                >
                  <Text style={{ color: theme.colors.text }}>
                    {configOptions.find(c => c.id === selectedConfig)?.name} (
                    {configOptions.find(c => c.id === selectedConfig)?.type})
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Login Button */}
              <TouchableOpacity
                style={[
                  styles.loginButton,
                  { backgroundColor: theme.colors.primary },
                ]}
                onPress={handleLogin}
              >
                <Text style={styles.loginButtonText}>Login</Text>
              </TouchableOpacity>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
              <Text
                style={[
                  styles.footerText,
                  { color: theme.colors.textSecondary },
                ]}
              >
                v1.0.0
              </Text>
            </View>
          </View>

          {/* Config Selection Modal */}
          <Modal
            visible={showConfigModal}
            transparent={true}
            animationType="slide"
            onRequestClose={() => setShowConfigModal(false)}
          >
            <View style={styles.modalOverlay}>
              <View
                style={[
                  styles.modalContent,
                  { backgroundColor: theme.colors.surface },
                ]}
              >
                <Text style={[styles.modalTitle, { color: theme.colors.text }]}>
                  Select Configuration
                </Text>

                <FlatList
                  data={configOptions}
                  keyExtractor={item => item.id}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={[
                        styles.configOption,
                        {
                          backgroundColor:
                            selectedConfig === item.id
                              ? theme.colors.primary + '20'
                              : 'transparent',
                          borderColor: theme.colors.border,
                        },
                      ]}
                      onPress={() => handleConfigSelect(item.id)}
                    >
                      <View style={styles.configOptionContent}>
                        <Text
                          style={[
                            styles.configName,
                            { color: theme.colors.text },
                          ]}
                        >
                          {item.name}
                        </Text>
                        <Text
                          style={[
                            styles.configType,
                            { color: theme.colors.textSecondary },
                          ]}
                        >
                          {item.type}
                        </Text>
                      </View>
                      {selectedConfig === item.id && (
                        <Text
                          style={{ color: theme.colors.primary, fontSize: 18 }}
                        >
                          ✓
                        </Text>
                      )}
                    </TouchableOpacity>
                  )}
                />

                <TouchableOpacity
                  style={[
                    styles.closeButton,
                    { backgroundColor: theme.colors.primary },
                  ]}
                  onPress={() => setShowConfigModal(false)}
                >
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  logoPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoText: {
    fontSize: 60,
  },
  appTitle: {
    fontSize: 28,
    fontWeight: '700',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 30,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 30,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
  },
  helperText: {
    fontSize: 12,
    marginBottom: 20,
    fontStyle: 'italic',
  },
  bold: {
    fontWeight: '700',
  },
  loginButton: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  footerText: {
    fontSize: 12,
    opacity: 0.6,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    maxHeight: '60%',
    borderRadius: 12,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  configOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
  },
  configOptionContent: {
    flex: 1,
  },
  configName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  configType: {
    fontSize: 12,
  },
  closeButton: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  closeButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default LoginScreen;
