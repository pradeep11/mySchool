import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Modal,
  Pressable,
  useColorScheme,
  Dimensions,
} from 'react-native';
import { useAppStore } from '../store/appStore';
import { getTheme } from '../config/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { configService } from '../services/ConfigService';

const ItemCard = ({
  item,
  onPress,
  vendorType,
}: {
  item: any;
  onPress: () => void;
  vendorType: string;
}) => {
  console.log('[ItemCard] Rendering item:', item);
  const renderItemDetails = () => {
    if (vendorType === 'school') {
      return (
        <>
          <Text style={styles.itemName}>{item.name}</Text>
          {item.parent && (
            <Text style={styles.itemSubtitle}>{item.parent}</Text>
          )}
          <Text style={styles.itemMeta}>{`Class-Section: ${
            item.classSection || ''
          }`}</Text>
          <Text style={styles.itemMeta}>{`Admission No: ${
            item.admissionNo || ''
          }`}</Text>
        </>
      );
    } else if (vendorType === 'pharmacy') {
      return (
        <>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemSubtitle}>{item.category}</Text>
          <Text style={styles.itemMeta}>{`Stock: ${item.stock}`}</Text>
          <Text style={styles.itemMeta}>{`Price: ${item.price}`}</Text>
          <Text style={styles.itemMeta}>{`Prescription: ${
            item.prescription ? 'Required' : 'Not Required'
          }`}</Text>
        </>
      );
    }
    return <Text style={styles.itemName}>{item.name}</Text>;
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.avatarPlaceholder}>
        <Text style={{ fontSize: 28 }}>
          {vendorType === 'school'
            ? '👦'
            : vendorType === 'pharmacy'
            ? '💊'
            : '📦'}
        </Text>
      </View>
      {renderItemDetails()}
    </TouchableOpacity>
  );
};

const StudentDetails: React.FC = () => {
  const { selectItem, selectedItem, toggleDrawer } = useAppStore();
  const [modalVisible, setModalVisible] = useState(false);
  const isDarkMode = useColorScheme() === 'dark';
  const theme = getTheme(isDarkMode);
  const insets = useSafeAreaInsets();
  const vendorType = configService.getVendorType();
  const detailsData = configService.getScreenData('details') as any;
  console.log('[StudentDetails] Details Data:', detailsData);
  const items = detailsData?.items || [];
  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.background,
          paddingBottom: insets.bottom,
        },
      ]}
    >
      <View
        style={[
          styles.header,
          {
            backgroundColor: theme.colors.primary,
            paddingTop: insets.top + 12,
          },
        ]}
      >
        <TouchableOpacity onPress={toggleDrawer} style={styles.hamburger}>
          <Text style={{ fontSize: 20 }}>☰</Text>
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.colors.surface }]}>
          {detailsData?.itemLabel || 'Details'}
        </Text>
      </View>

      <View style={styles.illustrationContainer}>
        <Text style={{ fontSize: 72 }}>
          {vendorType === 'school'
            ? '👨‍👩‍👧‍👦'
            : vendorType === 'pharmacy'
            ? '💊'
            : '📦'}
        </Text>
      </View>

      <View
        style={[styles.contentCard, { backgroundColor: theme.colors.surface }]}
      >
        <View style={styles.searchRow}>
          <View
            style={[
              styles.searchBox,
              { backgroundColor: theme.colors.background },
            ]}
          >
            <Text style={{ fontSize: 18 }}>🔍</Text>
          </View>
          <TouchableOpacity
            style={[
              styles.filterButton,
              { backgroundColor: theme.colors.background },
            ]}
          >
            <Text style={{ fontSize: 16 }}>☰</Text>
          </TouchableOpacity>
        </View>

        <Text style={[styles.groupTitle, { color: theme.colors.text }]}>
          {detailsData?.title || 'Items'}
        </Text>

        <FlatList
          data={items}
          keyExtractor={item => item.id}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          renderItem={({ item }) => (
            <ItemCard
              item={item}
              vendorType={vendorType}
              onPress={() => {
                selectItem(item);
                setModalVisible(true);
              }}
            />
          )}
          contentContainerStyle={{ paddingBottom: 80 + insets.bottom }}
        />
      </View>

      {/* Student Detail Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalContent,
              { backgroundColor: theme.colors.surface },
            ]}
          >
            <Text style={[styles.modalTitle, { color: theme.colors.text }]}>
              {detailsData?.itemLabel || 'Item'} Details
            </Text>
            {selectedItem ? (
              <View style={{ marginTop: 12 }}>
                <Text style={[styles.modalName, { color: theme.colors.text }]}>
                  {selectedItem.name}
                </Text>
                {vendorType === 'school' && (
                  <>
                    {selectedItem.parent && (
                      <Text
                        style={[
                          styles.modalText,
                          { color: theme.colors.textSecondary },
                        ]}
                      >{`Parent: ${selectedItem.parent}`}</Text>
                    )}
                    <Text
                      style={[styles.modalText, { color: theme.colors.text }]}
                    >{`Class-Section: ${
                      selectedItem.classSection || ''
                    }`}</Text>
                    <Text
                      style={[styles.modalText, { color: theme.colors.text }]}
                    >{`Admission No: ${selectedItem.admissionNo || ''}`}</Text>
                  </>
                )}
                {vendorType === 'pharmacy' && (
                  <>
                    <Text
                      style={[
                        styles.modalText,
                        { color: theme.colors.textSecondary },
                      ]}
                    >{`Category: ${selectedItem.category}`}</Text>
                    <Text
                      style={[styles.modalText, { color: theme.colors.text }]}
                    >{`Stock: ${selectedItem.stock}`}</Text>
                    <Text
                      style={[styles.modalText, { color: theme.colors.text }]}
                    >{`Price: ${selectedItem.price}`}</Text>
                    <Text
                      style={[styles.modalText, { color: theme.colors.text }]}
                    >
                      {`Prescription: ${
                        selectedItem.prescription ? 'Required' : 'Not Required'
                      }`}
                    </Text>
                  </>
                )}
              </View>
            ) : (
              <Text style={[styles.modalText, { color: theme.colors.text }]}>
                No item selected
              </Text>
            )}

            <View style={styles.modalActions}>
              <Pressable
                style={[
                  styles.modalButton,
                  { backgroundColor: theme.colors.primary },
                ]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={{ color: theme.colors.surface }}>Close</Text>
              </Pressable>
              <Pressable
                style={[
                  styles.modalButton,
                  { backgroundColor: theme.colors.success ?? '#4CAF50' },
                ]}
                onPress={() => {
                  // placeholder for more action
                  setModalVisible(false);
                }}
              >
                <Text style={{ color: theme.colors.surface }}>Action</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    paddingHorizontal: 16,
    paddingTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  hamburger: { padding: 6 },
  hamburgerText: { fontSize: 20 },
  title: { flex: 1, textAlign: 'center', fontSize: 20, fontWeight: '600' },
  illustrationContainer: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  illustration: { fontSize: 60 },
  contentCard: {
    margin: 12,
    backgroundColor: '#f6f6f6',
    borderRadius: 16,
    padding: 12,
    flex: 1,
  },
  searchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  searchBox: {
    flex: 1,
    height: 44,
    backgroundColor: '#fff',
    borderRadius: 10,
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  searchIcon: { fontSize: 18 },
  filterButton: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: '#fff',
    marginLeft: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  groupTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
  },
  columnWrapper: { justifyContent: 'space-between', marginBottom: 12 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    width: (Dimensions.get('window').width - 48) / 2,
    padding: 12,
    minHeight: 140,
    alignItems: 'center',
  },
  avatarPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 8,
  },
  avatarIcon: { fontSize: 28 },
  studentName: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    alignSelf: 'center',
  },
  studentSubtitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 4,
    alignSelf: 'center',
  },
  studentMeta: {
    fontSize: 12,
    color: '#333',
    marginTop: 8,
    textAlign: 'center',
  },
  fab: {
    position: 'absolute',
    bottom: 18,
    left: '50%',
    marginLeft: -28,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#1976D2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fabIcon: { color: '#fff', fontWeight: '700' },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
  },
  modalTitle: { fontSize: 18, fontWeight: '700', textAlign: 'center' },
  modalName: { fontSize: 16, fontWeight: '700', marginTop: 8 },
  modalText: { fontSize: 14, marginTop: 6 },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 6,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  itemSubtitle: {
    fontSize: 14,
    marginBottom: 8,
  },
  itemMeta: {
    fontSize: 12,
    marginBottom: 2,
  },
});

export default StudentDetails;
