import { fetchNote } from "@/src/utils/db/services/notesService";
import Feather from "@expo/vector-icons/Feather";
import {
  Stack,
  useFocusEffect,
  useLocalSearchParams,
  useRouter,
} from "expo-router";
import React, { useCallback, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { EnrichedText } from "react-native-enriched-html";

export default function NoteViewer() {
  const [noteData, setNoteData] = useState({});
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const handleEdit = () => {
    if (!id || id === "new") return;
    router.push({
      pathname: "/modules/(noteEditor)/[id]",
      params: {
        id,
      },
    });
  };
  useFocusEffect(
    useCallback(() => {
      async function note() {
        const notes = await fetchNote(id);
        setNoteData({
          id: notes.id,
          title: notes.noteTitle,
          body: notes.noteBody,
          createdAt: notes.createdAt,
          updatedAt: notes.updatedAt,
        });
      }
      note();
    }, [id]),
  );
  return (
    <>
      <Stack.Screen
        options={{
          title: "Ente Ledger",
          headerLeft: () => null,
          animation: "slide_from_right",
        }}
      />

      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={styles.title} numberOfLines={2}>
              {noteData.title}
            </Text>

            <Text style={styles.updatedAt}>{noteData.updatedAt}</Text>
          </View>

          <Pressable
            onPress={handleEdit}
            style={({ pressed }) => [
              styles.editButton,
              pressed && styles.editButtonPressed,
            ]}
            android_ripple={{ color: "#E5E7EB" }}
          >
            <Feather name="edit-2" size={18} color="#374151" />
            <Text style={styles.editText}>Edit</Text>
          </Pressable>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Note Content */}
        <ScrollView
          style={styles.content}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          <EnrichedText style={styles.noteText}>{noteData.body}</EnrichedText>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 16,
  },

  titleContainer: {
    flex: 1,
    paddingRight: 16,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
    lineHeight: 30,
  },

  updatedAt: {
    marginTop: 5,
    fontSize: 13,
    color: "#9CA3AF",
  },

  editButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 10,
    backgroundColor: "#F3F4F6",
  },

  editButtonPressed: {
    opacity: 0.6,
  },

  editText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
  },

  divider: {
    height: 1,
    backgroundColor: "#F1F5F9",
  },

  content: {
    flex: 1,
  },

  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },

  noteText: {
    fontSize: 16,
    lineHeight: 26,
    color: "#374151",
  },
});
