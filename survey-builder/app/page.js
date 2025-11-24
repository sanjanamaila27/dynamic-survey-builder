"use client";

import React, { useState } from "react";
import {
  Plus,
  Trash2,
  GripVertical,
  Eye,
  Code,
  CheckSquare,
} from "lucide-react";

export default function SurveyWorkspacePage() {
  const [surveyTitle, setSurveyTitle] = useState("Untitled Survey");
  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState({});
  const [activeView, setActiveView] = useState("builder"); // "builder" | "preview"

  // ---------- QUESTION CRUD ----------

  const addQuestion = () => {
    const newQuestion = {
      id: Date.now().toString(),
      label: "",
      type: "text",
      required: false,
      options: [],
    };
    setQuestions((prev) => [...prev, newQuestion]);
  };

  const updateQuestion = (id, field, value) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, [field]: value } : q))
    );
  };

  const deleteQuestion = (id) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
    setResponses((prev) => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
  };

  const addOption = (questionId) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === questionId
          ? {
              ...q,
              options: [...q.options, { id: Date.now().toString(), text: "" }],
            }
          : q
      )
    );
  };

  const updateOption = (questionId, optionId, text) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === questionId
          ? {
              ...q,
              options: q.options.map((opt) =>
                opt.id === optionId ? { ...opt, text } : opt
              ),
            }
          : q
      )
    );
  };

  const deleteOption = (questionId, optionId) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === questionId
          ? {
              ...q,
              options: q.options.filter((opt) => opt.id !== optionId),
            }
          : q
      )
    );
  };

  // ---------- RESPONSES ----------

  const handleResponseChange = (questionId, value) => {
    setResponses((prev) => ({ ...prev, [questionId]: value }));
  };

  const surveyDefinition = {
    title: surveyTitle,
    questions,
  };

  return (
    <div className="__page dark-theme">
      {/* Top header */}
      <header className="mb-6 flex items-start justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1 text-[11px] text-zinc-500">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Sotto · Coding Exercise
          </div>

          <div className="space-y-1">
            <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
              Dynamic Survey Builder
            </h1>
            <p className="text-xs text-zinc-500">
              Design questions · Preview UX · Inspect JSON
            </p>
          </div>
        </div>

        {/* View toggle – with animated underline */}
        <div className="sb-tab-rail relative inline-flex items-center rounded-full border border-zinc-200 bg-white p-1 text-xs text-zinc-500 shadow-sm">
          {/* sliding highlight */}
          <div
            className="sb-tab-highlight"
            style={{
              transform:
                activeView === "builder"
                  ? "translateX(0%)"
                  : "translateX(100%)",
            }}
          />
          <ViewChip
            label="Builder"
            icon={<Code size={14} />}
            active={activeView === "builder"}
            onClick={() => setActiveView("builder")}
          />
          <ViewChip
            label="Preview"
            icon={<Eye size={14} />}
            active={activeView === "preview"}
            onClick={() => setActiveView("preview")}
          />
        </div>
      </header>

      {/* Main canvas card */}
      <div className="sb-panel">
        {/* Ribbon */}
        <div className="flex items-center justify-between border-b border-zinc-200 pb-3 text-[11px] text-zinc-500">
          <span>Survey workspace · local only</span>
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-medium text-emerald-700">
            JSON updates live
          </span>
        </div>

        {/* Body */}
        <div className="pt-5">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1.1fr)]">
            {/* LEFT SIDE – Builder / Preview */}
            <section className="space-y-5">
              {/* Survey title block */}
              <div className="space-y-1">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500">
                  Survey title
                </p>
                <div className="rounded-xl border border-zinc-200 bg-white px-3 py-2.5 shadow-sm">
                  <input
                    type="text"
                    value={surveyTitle}
                    onChange={(e) => setSurveyTitle(e.target.value)}
                    placeholder="Give your survey a clear, human-friendly name…"
                    className="w-full border-none bg-transparent text-sm text-zinc-900 outline-none placeholder:text-zinc-400"
                  />
                </div>
              </div>

              {/* Section header */}
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500">
                    {activeView === "builder"
                      ? "Question builder"
                      : "Survey preview"}
                  </p>
                  <p className="mt-1 text-xs text-zinc-500">
                    {activeView === "builder"
                      ? "Add questions, choose types, and control required fields."
                      : "Fill this in as if you were the respondent."}
                  </p>
                </div>
                <span className="rounded-full bg-zinc-100 px-3 py-1 text-[11px] text-zinc-600">
                  {questions.length || 0} question
                  {questions.length === 1 ? "" : "s"}
                </span>
              </div>

              {activeView === "builder" ? (
                <BuilderPanel
                  questions={questions}
                  addQuestion={addQuestion}
                  updateQuestion={updateQuestion}
                  deleteQuestion={deleteQuestion}
                  addOption={addOption}
                  updateOption={updateOption}
                  deleteOption={deleteOption}
                />
              ) : (
                <PreviewPanel
                  title={surveyTitle}
                  questions={questions}
                  responses={responses}
                  onResponseChange={handleResponseChange}
                />
              )}
            </section>

            {/* RIGHT SIDE – JSON inspector */}
            <aside className="space-y-4">
              <div className="rounded-xl border border-zinc-200 bg-zinc-50 px-3.5 py-3 text-xs text-zinc-600">
                <p className="font-medium text-zinc-800">Inspector</p>
                <p className="mt-1 text-[11px] text-zinc-500">
                  Inspect the survey definition and responses backing your UI.
                </p>
              </div>

              <JsonPanel
                title="Survey Definition"
                data={surveyDefinition}
                emptyMessage="Add at least one question to see the schema."
              />

              <JsonPanel
                title="Responses"
                data={responses}
                emptyMessage="Interact with the Preview to generate responses."
              />
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -----------------------------
   VIEW TOGGLE CHIP
------------------------------ */

function ViewChip({ label, icon, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`sb-chip relative z-10 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-medium transition-all ${
        active
          ? "sb-chip-active text-zinc-50"
          : "text-zinc-500 hover:text-zinc-800"
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

/* -----------------------------
   BUILDER PANEL
------------------------------ */

function BuilderPanel({
  questions,
  addQuestion,
  updateQuestion,
  deleteQuestion,
  addOption,
  updateOption,
  deleteOption,
}) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-zinc-50/80 px-3.5 py-3.5">
      {/* Toolbar row */}
      <div className="mb-3 flex items-center justify-between gap-3 text-xs text-zinc-600">
        <span>
          <span className="font-medium text-zinc-800">
            {questions.length || 0}
          </span>{" "}
          configured
        </span>
        <button
          type="button"
          onClick={addQuestion}
          className="inline-flex items-center gap-1 rounded-full bg-indigo-500 px-3 py-1 text-[11px] font-medium text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-indigo-400 active:translate-y-0"
        >
          <Plus size={13} />
          Add question
        </button>
      </div>

      {/* Empty state */}
      {questions.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-zinc-300 bg-white px-6 py-8 text-center">
          <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-zinc-50">
            <CheckSquare size={18} className="text-zinc-400" />
          </div>
          <p className="text-sm font-medium text-zinc-800">No questions yet</p>
          <p className="mt-1 text-xs text-zinc-500">
            Start by adding your first question.
          </p>
          <button
            type="button"
            onClick={addQuestion}
            className="mt-4 inline-flex items-center gap-1 rounded-full border border-indigo-400 bg-white px-3 py-1 text-[11px] font-medium text-indigo-600 hover:bg-indigo-50"
          >
            <Plus size={13} />
            Add your first question
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {questions.map((q, index) => (
            <QuestionRow
              key={q.id}
              question={q}
              index={index}
              onUpdate={updateQuestion}
              onDelete={deleteQuestion}
              onAddOption={addOption}
              onUpdateOption={updateOption}
              onDeleteOption={deleteOption}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* One question block – animated on mount */

function QuestionRow({
  question,
  index,
  onUpdate,
  onDelete,
  onAddOption,
  onUpdateOption,
  onDeleteOption,
}) {
  return (
    <div className="sb-question-appear rounded-lg border border-zinc-200 bg-white px-3 py-3 text-xs shadow-sm transition hover:border-indigo-300">
      <div className="mb-2 flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 text-zinc-400">
          <GripVertical size={14} />
          <span className="font-medium text-zinc-500">Q{index + 1}</span>
        </div>
        <button
          type="button"
          onClick={() => onDelete(question.id)}
          className="rounded-full p-1 text-zinc-400 transition hover:bg-rose-50 hover:text-rose-500"
        >
          <Trash2 size={14} />
        </button>
      </div>

      {/* Question label */}
      <input
        type="text"
        value={question.label}
        onChange={(e) => onUpdate(question.id, "label", e.target.value)}
        placeholder="Ask a clear, concise question…"
        className="mb-2 w-full border-none bg-transparent text-sm text-zinc-900 outline-none placeholder:text-zinc-400"
      />

      {/* Controls row */}
      <div className="flex flex-wrap items-center gap-2">
        <select
          value={question.type}
          onChange={(e) => onUpdate(question.id, "type", e.target.value)}
          className="rounded-full border border-zinc-200 bg-white px-3 py-1 text-[11px] text-zinc-800 outline-none focus:border-indigo-400"
        >
          <option value="text">Freeform Text</option>
          <option value="multiple-choice">Multiple Choice</option>
        </select>

        <label className="inline-flex items-center gap-1 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-[11px] text-zinc-700">
          <input
            type="checkbox"
            checked={question.required}
            onChange={(e) =>
              onUpdate(question.id, "required", e.target.checked)
            }
            className="h-3 w-3 accent-indigo-500"
          />
          <span>Required</span>
        </label>
      </div>

      {/* Multiple choice options */}
      {question.type === "multiple-choice" && (
        <div className="mt-3 space-y-2 border-t border-dashed border-zinc-200 pt-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium text-zinc-600">
              Options
            </span>
            <button
              type="button"
              onClick={() => onAddOption(question.id)}
              className="inline-flex items-center gap-1 text-[11px] font-medium text-indigo-600 hover:text-indigo-500"
            >
              <Plus size={11} />
              Add option
            </button>
          </div>

          {question.options.length === 0 && (
            <p className="text-[11px] italic text-zinc-400">
              No options yet. Add at least one option.
            </p>
          )}

          {question.options.map((opt, idx) => (
            <div
              key={opt.id}
              className="flex items-center gap-2 rounded-md border border-zinc-200 bg-zinc-50 px-2 py-1.5"
            >
              <span className="w-5 text-[10px] text-zinc-400">{idx + 1}.</span>
              <input
                type="text"
                value={opt.text}
                onChange={(e) =>
                  onUpdateOption(question.id, opt.id, e.target.value)
                }
                placeholder="Option label…"
                className="flex-1 border-none bg-transparent text-xs text-zinc-800 outline-none placeholder:text-zinc-400"
              />
              <button
                type="button"
                onClick={() => onDeleteOption(question.id, opt.id)}
                className="rounded-md p-1 text-zinc-400 transition hover:bg-rose-50 hover:text-rose-500"
              >
                <Trash2 size={12} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* -----------------------------
   PREVIEW PANEL
------------------------------ */

function PreviewPanel({ title, questions, responses, onResponseChange }) {
  const hasQuestions = questions.length > 0;

  return (
    <div className="rounded-xl border border-zinc-200 bg-zinc-50/80 px-3.5 py-3.5 text-xs">
      <div className="mb-3">
        <p className="text-[11px] uppercase tracking-[0.16em] text-zinc-500">
          Survey preview
        </p>
        <p className="text-sm font-medium text-zinc-900">
          {title || "Untitled Survey"}
        </p>
      </div>

      {!hasQuestions ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-zinc-300 bg-white px-6 py-8 text-center">
          <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-zinc-50">
            <Eye size={18} className="text-zinc-400" />
          </div>
          <p className="text-sm font-medium text-zinc-800">
            Nothing to preview yet
          </p>
          <p className="mt-1 text-xs text-zinc-500">
            Add questions in the Builder view to see them here.
          </p>
        </div>
      ) : (
        <form className="space-y-4">
          {questions.map((q, index) => (
            <div
              key={q.id}
              className="rounded-lg border border-zinc-200 bg-white px-3 py-3"
            >
              <div className="mb-1 flex items-start justify-between gap-2">
                <label className="block text-sm font-medium text-zinc-900">
                  {index + 1}. {q.label || "Untitled question"}
                  {q.required && (
                    <span className="ml-1 text-xs font-semibold text-rose-500">
                      *
                    </span>
                  )}
                </label>
              </div>

              <div className="mb-2">
                <span className="inline-flex items-center rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] text-zinc-500">
                  {q.type === "text" ? "Freeform text" : "Multiple choice"}
                </span>
              </div>

              {q.type === "text" ? (
                <textarea
                  rows={3}
                  className="w-full resize-none rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                  placeholder="Respondent answer…"
                  value={responses[q.id] || ""}
                  onChange={(e) =>
                    onResponseChange(q.id, e.target.value)
                  }
                />
              ) : (
                <div className="space-y-1.5">
                  {q.options.length === 0 ? (
                    <p className="text-[11px] italic text-zinc-400">
                      No options for this question.
                    </p>
                  ) : (
                    q.options.map((opt) => (
                      <label
                        key={opt.id}
                        className="flex cursor-pointer items-center gap-2 rounded-md border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-sm text-zinc-900 transition hover:border-indigo-300 hover:bg-indigo-50/50"
                      >
                        <input
                          type="radio"
                          name={q.id}
                          value={opt.text}
                          checked={responses[q.id] === opt.text}
                          onChange={(e) =>
                            onResponseChange(q.id, e.target.value)
                          }
                          className="h-4 w-4 border-zinc-300 text-indigo-600 focus:ring-indigo-200"
                        />
                        <span>
                          {opt.text || (
                            <span className="italic text-zinc-400">
                              Untitled option
                            </span>
                          )}
                        </span>
                      </label>
                    ))
                  )}
                </div>
              )}
            </div>
          ))}

          <button
            type="button"
            className="mt-2 w-full rounded-full bg-zinc-900 px-4 py-2.5 text-sm font-medium text-zinc-50 shadow-sm transition hover:-translate-y-0.5 hover:bg-zinc-800 active:translate-y-0"
          >
            Submit (mock)
          </button>
        </form>
      )}
    </div>
  );
}

/* -----------------------------
   JSON PANEL – Collapsible
------------------------------ */

function JsonPanel({ title, data, emptyMessage }) {
  const [expanded, setExpanded] = useState(true);
  const [copied, setCopied] = useState(false);

  const isEmpty = Array.isArray(data)
    ? data.length === 0
    : !data || Object.keys(data).length === 0;

  const handleCopy = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white text-xs shadow-sm">
      {/* Clickable header (div, not button – avoids nested button issue) */}
      <div
        role="button"
        aria-expanded={expanded}
        onClick={() => setExpanded((x) => !x)}
        className="flex cursor-pointer items-center justify-between gap-2 border-b border-zinc-200 bg-zinc-50 px-3.5 py-2.5"
      >
        <div className="flex items-center gap-2">
          <Code size={13} className="text-zinc-500" />
          <span className="text-[11px] font-medium text-zinc-800">
            {title}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {!isEmpty && (
            <button
              type="button"
              onClick={handleCopy}
              className="rounded-full bg-zinc-900 px-2 py-0.5 text-[10px] text-zinc-50 hover:bg-zinc-700"
            >
              {copied ? "✓ Copied" : "Copy"}
            </button>
          )}
          <span className="text-[11px] text-zinc-500">
            {expanded ? "−" : "+"}
          </span>
        </div>
      </div>

      {expanded && (
        <div className="max-h-64 overflow-auto p-3">
          {isEmpty ? (
            <p className="text-[11px] italic text-zinc-500">
              {emptyMessage}
            </p>
          ) : (
            <pre className="whitespace-pre-wrap text-[11px]">
              {JSON.stringify(data, null, 2)}
            </pre>
          )}
        </div>
      )}
    </div>
  );
}