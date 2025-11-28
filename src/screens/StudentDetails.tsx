import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
  SafeAreaView,
  Modal,
  Pressable,
  useColorScheme,
} from 'react-native';
import { useAppContext } from '../context/AppContext';
import { getTheme } from '../config/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const StudentCard = ({ student, onPress }: { student: any; onPress: () => void }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.avatarPlaceholder}>
        <Text style={{ fontSize: 28 }}>👦</Text>
      </View>
      <Text style={styles.studentName}>{student.name}</Text>
      {student.parent ? (
        <Text style={styles.studentSubtitle}>{student.parent}</Text>
      ) : null}
      <Text style={styles.studentMeta}>{`Class-Section: ${student.classSection || ''}`}</Text>
      <Text style={styles.studentMeta}>{`Admission No: ${student.admissionNo || ''}`}</Text>
    </TouchableOpacity>
  );
};

const StudentDetails: React.FC = () => {
  const { students, navigate, selectStudent, selectedStudent } = useAppContext();
  const [modalVisible, setModalVisible] = useState(false);
  const isDarkMode = useColorScheme() === 'dark';
  const theme = getTheme(isDarkMode);
  const insets = useSafeAreaInsets();
  const screenWidth = Dimensions.get('window').width;
  const itemWidth = (screenWidth - 48) / 2;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background, paddingBottom: insets.bottom }]}>
      <View style={[styles.header, { backgroundColor: theme.colors.primary, paddingTop: insets.top + 12 }]}>
        <TouchableOpacity onPress={() => navigate('home')} style={styles.hamburger}>
          <Text style={{ fontSize: 20 }}>≡</Text>
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.colors.surface }]}>Student Details</Text>
      </View>

      <View style={styles.illustrationContainer}>
        <Text style={{ fontSize: 72 }}>👨‍👩‍👧‍👦</Text>
      </View>

      <View style={[styles.contentCard, { backgroundColor: theme.colors.surface }]}>
        <View style={styles.searchRow}>
          <View style={[styles.searchBox, { backgroundColor: theme.colors.background }]}>
            <Text style={{ fontSize: 18 }}>🔍</Text>
          </View>
          <TouchableOpacity style={[styles.filterButton, { backgroundColor: theme.colors.background }]}>
            <Text style={{ fontSize: 16 }}>☰</Text>
          </TouchableOpacity>
        </View>

            <Text style={[styles.groupTitle, { color: theme.colors.text } ]}>Play Group A</Text>

            <FlatList
          data={students}
          keyExtractor={(it) => it.id}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
              renderItem={({ item }) => (
                <StudentCard
                  student={item}
                  onPress={() => {
                    selectStudent(item);
                    setModalVisible(true);
                  }}
                />
              )}
          contentContainerStyle={{ paddingBottom: 80 + insets.bottom }}
        />
      </View>

      <TouchableOpacity style={[styles.fab, { backgroundColor: theme.colors.primary, bottom: 18 + insets.bottom }]} onPress={() => {}}>
        <Text style={{ fontSize: 18, color: theme.colors.surface }}>⬛⬛</Text>
      </TouchableOpacity>

      {/* Student Detail Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.colors.surface }]}>
            <Text style={[styles.modalTitle, { color: theme.colors.text }]}>Student Details</Text>
            {selectedStudent ? (
              <View style={{ marginTop: 12 }}>
                <Text style={[styles.modalName, { color: theme.colors.text }]}>{selectedStudent.name}</Text>
                {selectedStudent.parent ? (
                  <Text style={[styles.modalText, { color: theme.colors.textSecondary }]}>{`Parent: ${selectedStudent.parent}`}</Text>
                ) : null}
                <Text style={[styles.modalText, { color: theme.colors.text }]}>{`Class-Section: ${selectedStudent.classSection || ''}`}</Text>
                <Text style={[styles.modalText, { color: theme.colors.text }]}>{`Admission No: ${selectedStudent.admissionNo || ''}`}</Text>
              </View>
            ) : (
              <Text style={[styles.modalText, { color: theme.colors.text }]}>No student selected</Text>
            )}

            <View style={styles.modalActions}>
              <Pressable
                style={[styles.modalButton, { backgroundColor: theme.colors.primary }]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={{ color: theme.colors.surface }}>Close</Text>
              </Pressable>
              <Pressable
                style={[styles.modalButton, { backgroundColor: theme.colors.success ?? '#4CAF50' }]}
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
  searchRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
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
  groupTitle: { fontSize: 16, fontWeight: '600', marginBottom: 12, textAlign: 'center' },
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
  studentName: { fontSize: 14, fontWeight: '600', textAlign: 'center' , alignSelf: 'center'},
  studentSubtitle: { fontSize: 12, color: '#666', textAlign: 'center', marginTop: 4 , alignSelf: 'center'},
  studentMeta: { fontSize: 12, color: '#333', marginTop: 8, textAlign: 'center' },
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
  modalActions: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 },
  modalButton: { flex: 1, padding: 12, borderRadius: 8, alignItems: 'center', marginHorizontal: 6 },
});

export default StudentDetails;
