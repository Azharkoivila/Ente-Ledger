import CustomInput from "@/app/components/input";
import { Button, ButtonText } from "@/components/ui/button";
import {
  createNote,
  fetchNote,
  updateNote,
} from "@/src/utils/db/services/notesService";
import { isAnyError } from "@/src/utils/validator/formValidator";
import validateNoteForm from "@/src/utils/validator/noteValidator";
import {
  router,
  Stack,
  useFocusEffect,
  useLocalSearchParams,
} from "expo-router";
import { useCallback, useRef, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import type {
  EnrichedTextInputInstance,
  OnChangeStateEvent,
} from "react-native-enriched-html";
import { EnrichedTextInput } from "react-native-enriched-html";

export default function NoteEditor() {
  const { id } = useLocalSearchParams();
  const ref = useRef<EnrichedTextInputInstance>(null);
  const [state, setState] = useState<OnChangeStateEvent | null>(null);
  const [noteTitle, SetNoteTitle] = useState();
  const [notes, SetNotes] = useState();
  useFocusEffect(
    useCallback(() => {
      async function load() {
        console.log(id);

        if (!id || id === "new") return;

        //! id logic
        const note = await fetchNote(id);
        console.log(note.noteTitle);
        SetNoteTitle({ name: "noteTitle", value: note.noteTitle });
        ref.current?.setValue(note.noteBody);
      }

      load();
    }, [id]),
  );

  const handleSaveNotes = () => {
    const title = noteTitle?.value;
    const response = validateNoteForm(title, notes);
    const any = isAnyError(response);
    console.log(response);

    if (any) {
      console.log("EmpTY ALERT");
    } else if (id && id !== "new") {
      updateNote(id, { noteTitle: title, noteBody: notes });
      SetNoteTitle("");
      ref.current?.setValue("");
      router.back();
    } else {
      createNote({
        noteTitle: title,
        noteBody: notes,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
      SetNoteTitle("");
      SetNotes("");
      ref.current?.setValue("");
      router.back();
    }
  };
  // Inline styles apply to the selected characters.
  const inlineButtons = [
    {
      label: "Bold",
      state: state?.bold,
      onPress: () => ref.current?.toggleBold(),
    },
    {
      label: "Italic",
      state: state?.italic,
      onPress: () => ref.current?.toggleItalic(),
    },
    {
      label: "Underline",
      state: state?.underline,
      onPress: () => ref.current?.toggleUnderline(),
    },
    {
      label: "Strike",
      state: state?.strikeThrough,
      onPress: () => ref.current?.toggleStrikeThrough(),
    },
  ];

  // Paragraph styles apply to the whole line the cursor sits in.
  const paragraphButtons = [
    { label: "H1", state: state?.h1, onPress: () => ref.current?.toggleH1() },
    { label: "H2", state: state?.h2, onPress: () => ref.current?.toggleH2() },
    {
      label: "Quote",
      state: state?.blockQuote,
      onPress: () => ref.current?.toggleBlockQuote(),
    },
    {
      label: "Code",
      state: state?.codeBlock,
      onPress: () => ref.current?.toggleCodeBlock(),
    },
  ];
  const listButtons = [
    {
      label: "Bulleted",
      state: state?.unorderedList,
      onPress: () => ref.current?.toggleUnorderedList(),
    },
    {
      label: "Numbered",
      state: state?.orderedList,
      onPress: () => ref.current?.toggleOrderedList(),
    },
    {
      label: "Checkbox",
      state: state?.checkboxList,
      // Pass whether new checkboxes start checked or unchecked.
      onPress: () => ref.current?.toggleCheckboxList(false),
    },
  ];
  const alignments = ["left", "center", "right"] as const;

  const renderButton = (
    button: (typeof inlineButtons)[number] | (typeof paragraphButtons)[number],
  ) => (
    <Pressable
      key={button.label}
      disabled={button.state?.isBlocking}
      style={[
        styles.button,
        button.state?.isActive && styles.buttonActive,
        button.state?.isBlocking && styles.buttonDisabled,
      ]}
      onPress={button.onPress}
    >
      <Text style={[styles.text, button.state?.isActive && styles.textActive]}>
        {button.label}
      </Text>
    </Pressable>
  );

  const renderTextAlignmentButton = (
    alignment: (typeof alignments)[number],
  ) => {
    // A single string reports the alignment of the paragraph at the cursor.
    const isActive = state?.alignment === alignment;
    return (
      <Pressable
        key={alignment}
        style={[styles.button, isActive && styles.buttonActive]}
        onPress={() => {
          const alignmentToSet = isActive ? "auto" : alignment;
          ref.current?.setTextAlignment(alignmentToSet);
        }}
      >
        <Text style={[styles.text, isActive && styles.textActive]}>
          {alignment}
        </Text>
      </Pressable>
    );
  };

  const renderDivider = (key: string) => (
    <View key={key} style={styles.divider} />
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
      <View style={styles.screen}>
        <View style={styles.titleSection}>
          <Text style={styles.titleLabel}>Title</Text>
          <CustomInput
            usedFor="noteTitle"
            onChange={SetNoteTitle}
            value={noteTitle?.value}
          ></CustomInput>
        </View>
        <View style={styles.container}>
          <EnrichedTextInput
            htmlStyle={{
              h1: { fontSize: 28, bold: true },
              ul: { bulletColor: "cyan", bulletSize: 8 },
              code: { color: "red", backgroundColor: "yellow" },
              blockquote: { borderColor: "#57b495", borderWidth: 3 },
              codeblock: { color: "#34f88c", backgroundColor: "#010604" },
              ulCheckbox: { boxColor: "green", gapWidth: 5 },
            }}
            ref={ref}
            editable={true}
            style={styles.input}
            placeholder="Type something here..."
            onChangeHtml={(e) => SetNotes(e.nativeEvent.value)}
            onChangeState={(e) => setState(e.nativeEvent)}
          />

          <View style={styles.toolbarWrap}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.toolbarContent}
            >
              {inlineButtons.map(renderButton)}
              {renderDivider("divider-1")}
              {paragraphButtons.map(renderButton)}
              {renderDivider("divider-2")}
              {listButtons.map(renderButton)}
              {renderDivider("divider-3")}
              {alignments.map(renderTextAlignmentButton)}
            </ScrollView>
          </View>
        </View>
        <Button onPress={handleSaveNotes}>
          <ButtonText>Save</ButtonText>
        </Button>
      </View>
    </>
  );
}

// Primary green palette — swap PRIMARY to match your exact brand token.
const PRIMARY = "#15803D"; // deep, professional green
const PRIMARY_SOFT = "#EAF6EE"; // tint for backgrounds/active surfaces
const PRIMARY_BORDER = "#BFE3CB"; // tint for resting borders
const INK = "#1F2430"; // near-black text
const SUBTLE = "#6B7280"; // muted gray text
const BORDER = "#E4E7EC"; // neutral hairline

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    padding: 16,
    gap: 18,
  },
  titleSection: {
    gap: 6,
  },
  titleLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: SUBTLE,
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: BORDER,
    padding: 12,
    gap: 10,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 1,
  },
  input: {
    fontSize: 16,
    lineHeight: 23,
    color: INK,
    padding: 12,
    borderRadius: 10,
    minHeight: 300,
    maxHeight: 200,
    backgroundColor: "#FFFFFF",
  },
  toolbarWrap: {
    borderTopWidth: 1,
    borderTopColor: BORDER,
    paddingTop: 10,
  },
  toolbarContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 2,
  },
  divider: {
    width: 1,
    alignSelf: "stretch",
    marginVertical: 2,
    marginHorizontal: 4,
    backgroundColor: BORDER,
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: BORDER,
    backgroundColor: "#FFFFFF",
  },
  buttonActive: {
    borderColor: PRIMARY,
    backgroundColor: PRIMARY_SOFT,
  },
  buttonDisabled: {
    opacity: 0.35,
  },
  text: {
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
    color: SUBTLE,
  },
  textActive: {
    color: PRIMARY,
    fontWeight: "700",
  },
});
