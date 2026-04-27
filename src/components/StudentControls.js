import { View, Text, TextInput, StyleSheet } from 'react-native';

export default function StudentControls({
  searchText,
  onChangeSearch,
  sortBy,
  onChangeSort,
  filterRisk,
  onChangeFilterRisk,
  filterHold,
  onChangeFilterHold,
}) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search by name, ID, or major"
        value={searchText}
        onChangeText={onChangeSearch}
      />

      <Text style={styles.label}>Sort By</Text>
      <View style={styles.row}>
        <Text
          style={[styles.chip, sortBy === 'name' && styles.activeChip]}
          onPress={() => onChangeSort('name')}
        >
          Name
        </Text>
        <Text
          style={[styles.chip, sortBy === 'gpa' && styles.activeChip]}
          onPress={() => onChangeSort('gpa')}
        >
          GPA
        </Text>
        <Text
          style={[styles.chip, sortBy === 'graduationYear' && styles.activeChip]}
          onPress={() => onChangeSort('graduationYear')}
        >
          Grad Year
        </Text>
      </View>

      <Text style={styles.label}>Filter Risk</Text>
      <View style={styles.row}>
        <Text
          style={[styles.chip, filterRisk === 'All' && styles.activeChip]}
          onPress={() => onChangeFilterRisk('All')}
        >
          All
        </Text>
        <Text
          style={[styles.chip, filterRisk === 'Low' && styles.activeChip]}
          onPress={() => onChangeFilterRisk('Low')}
        >
          Low
        </Text>
        <Text
          style={[styles.chip, filterRisk === 'Medium' && styles.activeChip]}
          onPress={() => onChangeFilterRisk('Medium')}
        >
          Medium
        </Text>
        <Text
          style={[styles.chip, filterRisk === 'High' && styles.activeChip]}
          onPress={() => onChangeFilterRisk('High')}
        >
          High
        </Text>
      </View>

      <Text style={styles.label}>Filter Hold</Text>
      <View style={styles.row}>
        <Text
          style={[styles.chip, filterHold === 'All' && styles.activeChip]}
          onPress={() => onChangeFilterHold('All')}
        >
          All
        </Text>
        <Text
          style={[styles.chip, filterHold === 'Yes' && styles.activeChip]}
          onPress={() => onChangeFilterHold('Yes')}
        >
          Hold
        </Text>
        <Text
          style={[styles.chip, filterHold === 'No' && styles.activeChip]}
          onPress={() => onChangeFilterHold('No')}
        >
          No Hold
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#d0d7de',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
  },
  label: {
    fontWeight: '700',
    marginBottom: 8,
    marginTop: 4,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 10,
  },
  chip: {
    backgroundColor: '#e9eef5',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    overflow: 'hidden',
  },
  activeChip: {
    backgroundColor: '#bcd3ff',
  },
});