import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getTheme } from '../config/theme';
import { useAppStore } from '../store/appStore';
import { configService } from '../services/ConfigService';

interface Facility {
  name: string;
  icon: string;
  description: string;
}

const SchoolInfoScreen: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const theme = getTheme(isDarkMode);
  const { toggleDrawer } = useAppStore();
  const vendorType = configService.getVendorType();

  const infoData = configService.getScreenData('info') as any;
  const facilities = infoData?.facilities || infoData?.services || [];

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.primary }]}>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={toggleDrawer}
          activeOpacity={0.7}
        >
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.colors.surface }]}>
          {infoData?.title || 'Information'}
        </Text>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Overview Section */}
        <View
          style={[styles.section, { backgroundColor: theme.colors.surface }]}
        >
          <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
            {vendorType === 'school'
              ? '🏫 About Our School'
              : '🏥 About Our Store'}
          </Text>
          <Text style={[styles.schoolName, { color: theme.colors.text }]}>
            {infoData?.name}
          </Text>
          <Text style={[styles.description, { color: theme.colors.text }]}>
            {vendorType === 'school'
              ? `Established in ${infoData?.established}, ${infoData?.name} has been providing quality education to students for over 25 years. We focus on holistic development and academic excellence.`
              : `Established in ${infoData?.established}, ${infoData?.name} is committed to providing quality healthcare services and medications to our community. Your health and wellness is our top priority.`}
          </Text>
        </View>

        {/* Contact Information */}
        <View
          style={[styles.section, { backgroundColor: theme.colors.surface }]}
        >
          <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
            📞 Contact Information
          </Text>
          <View style={styles.contactItem}>
            <Text
              style={[
                styles.contactLabel,
                { color: theme.colors.textSecondary },
              ]}
            >
              Address:
            </Text>
            <Text style={[styles.contactValue, { color: theme.colors.text }]}>
              {infoData?.address}
            </Text>
          </View>
          <View style={styles.contactItem}>
            <Text
              style={[
                styles.contactLabel,
                { color: theme.colors.textSecondary },
              ]}
            >
              Phone:
            </Text>
            <Text style={[styles.contactValue, { color: theme.colors.text }]}>
              {infoData?.phone}
            </Text>
          </View>
          <View style={styles.contactItem}>
            <Text
              style={[
                styles.contactLabel,
                { color: theme.colors.textSecondary },
              ]}
            >
              Email:
            </Text>
            <Text style={[styles.contactValue, { color: theme.colors.text }]}>
              {infoData?.email}
            </Text>
          </View>
          <View style={styles.contactItem}>
            <Text
              style={[
                styles.contactLabel,
                { color: theme.colors.textSecondary },
              ]}
            >
              Website:
            </Text>
            <Text style={[styles.contactValue, { color: theme.colors.text }]}>
              {infoData?.website}
            </Text>
          </View>
        </View>

        {/* Statistics */}
        <View
          style={[styles.section, { backgroundColor: theme.colors.surface }]}
        >
          <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
            {vendorType === 'school'
              ? '📊 School Statistics'
              : '📊 Store Statistics'}
          </Text>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text
                style={[styles.statNumber, { color: theme.colors.primary }]}
              >
                {infoData?.totalItems || infoData?.totalStudents}
              </Text>
              <Text style={[styles.statLabel, { color: theme.colors.text }]}>
                {vendorType === 'school' ? 'Students' : 'Items'}
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text
                style={[styles.statNumber, { color: theme.colors.primary }]}
              >
                {infoData?.staff || infoData?.teachers}
              </Text>
              <Text style={[styles.statLabel, { color: theme.colors.text }]}>
                {vendorType === 'school' ? 'Teachers' : 'Staff'}
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text
                style={[styles.statNumber, { color: theme.colors.primary }]}
              >
                {infoData?.established}
              </Text>
              <Text style={[styles.statLabel, { color: theme.colors.text }]}>
                Established
              </Text>
            </View>
          </View>
        </View>

        {/* Facilities/Services */}
        <View
          style={[styles.section, { backgroundColor: theme.colors.surface }]}
        >
          <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
            {vendorType === 'school' ? '🏢 Facilities' : '🏥 Services'}
          </Text>
          {facilities.map((facility: any, index: number) => (
            <View key={index} style={styles.facilityItem}>
              <Text style={styles.facilityIcon}>{facility.icon}</Text>
              <View style={styles.facilityInfo}>
                <Text
                  style={[styles.facilityName, { color: theme.colors.text }]}
                >
                  {facility.name}
                </Text>
                <Text
                  style={[
                    styles.facilityDescription,
                    { color: theme.colors.textSecondary },
                  ]}
                >
                  {facility.description}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Leadership */}
        <View
          style={[styles.section, { backgroundColor: theme.colors.surface }]}
        >
          <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
            👔 Leadership
          </Text>
          <View style={styles.leadershipItem}>
            <Text
              style={[
                styles.leadershipRole,
                { color: theme.colors.textSecondary },
              ]}
            >
              {vendorType === 'school' ? 'Principal' : 'Manager'}
            </Text>
            <Text style={[styles.leadershipName, { color: theme.colors.text }]}>
              {infoData?.manager || infoData?.principal}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuIcon: {
    fontSize: 20,
    color: '#FFFFFF',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  schoolName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
  },
  contactItem: {
    marginBottom: 8,
  },
  contactLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 2,
  },
  contactValue: {
    fontSize: 14,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  facilityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  facilityIcon: {
    fontSize: 24,
    marginRight: 12,
    width: 30,
    textAlign: 'center',
  },
  facilityInfo: {
    flex: 1,
  },
  facilityName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  facilityDescription: {
    fontSize: 12,
  },
  leadershipItem: {
    marginBottom: 8,
  },
  leadershipRole: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 2,
  },
  leadershipName: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default SchoolInfoScreen;
