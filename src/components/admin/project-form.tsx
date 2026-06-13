"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useLanguage } from "@/lib/i18n/context";
import { Project, ProjectType } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input, Label, Select, Textarea } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

const TYPES: ProjectType[] = [
  "github_open",
  "github_private",
  "app_store",
  "hardware",
];

interface Props {
  project: Project | null;
  onClose: () => void;
  onSaved: () => void;
}

export function ProjectForm({ project, onClose, onSaved }: Props) {
  const { t } = useLanguage();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    title: project?.title ?? "",
    description: project?.description ?? "",
    description_tr: project?.description_tr ?? "",
    type: project?.type ?? ("github_private" as ProjectType),
    tech_stack: (project?.tech_stack ?? []).join(", "),
    github_repo_url: project?.github_repo_url ?? "",
    app_store_url: project?.app_store_url ?? "",
    display_order: project?.display_order ?? 0,
    is_visible: project?.is_visible ?? true,
  });

  function set<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSaving(true);

    const payload = {
      title: form.title.trim(),
      description: form.description.trim(),
      description_tr: form.description_tr.trim() || null,
      type: form.type,
      tech_stack: form.tech_stack
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      github_repo_url: form.github_repo_url.trim() || null,
      app_store_url: form.app_store_url.trim() || null,
      display_order: Number(form.display_order) || 0,
      is_visible: form.is_visible,
    };

    const supabase = createClient();
    const { error } = project
      ? await supabase.from("projects").update(payload).eq("id", project.id)
      : await supabase.from("projects").insert(payload);

    setSaving(false);

    if (error) {
      setError(error.message);
      return;
    }
    onSaved();
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">{t.admin.f_title}</Label>
        <Input
          id="title"
          required
          value={form.title}
          onChange={(e) => set("title", e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="description">{t.admin.f_desc}</Label>
        <Textarea
          id="description"
          required
          value={form.description}
          onChange={(e) => set("description", e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="description_tr">{t.admin.f_desc_tr}</Label>
        <Textarea
          id="description_tr"
          value={form.description_tr}
          onChange={(e) => set("description_tr", e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="type">{t.admin.f_type}</Label>
          <Select
            id="type"
            value={form.type}
            onChange={(e) => set("type", e.target.value as ProjectType)}
          >
            {TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </Select>
        </div>
        <div>
          <Label htmlFor="order">{t.admin.f_order}</Label>
          <Input
            id="order"
            type="number"
            value={form.display_order}
            onChange={(e) => set("display_order", Number(e.target.value))}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="tech">{t.admin.f_tech}</Label>
        <Input
          id="tech"
          value={form.tech_stack}
          onChange={(e) => set("tech_stack", e.target.value)}
          placeholder="React Native, Node.js, Expo"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="github">{t.admin.f_github}</Label>
          <Input
            id="github"
            value={form.github_repo_url}
            onChange={(e) => set("github_repo_url", e.target.value)}
            placeholder="https://github.com/..."
          />
        </div>
        <div>
          <Label htmlFor="appstore">{t.admin.f_appstore}</Label>
          <Input
            id="appstore"
            value={form.app_store_url}
            onChange={(e) => set("app_store_url", e.target.value)}
            placeholder="https://apps.apple.com/..."
          />
        </div>
      </div>

      <div className="flex items-center justify-between rounded-[var(--radius)] border border-border px-3 py-2.5">
        <Label htmlFor="visible" className="mb-0">
          {t.admin.f_visible}
        </Label>
        <Switch
          checked={form.is_visible}
          onCheckedChange={(v) => set("is_visible", v)}
          aria-label={t.admin.f_visible}
        />
      </div>

      {error && (
        <p className="rounded-[var(--radius)] border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {error}
        </p>
      )}

      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="ghost" onClick={onClose}>
          {t.admin.cancel}
        </Button>
        <Button type="submit" disabled={saving}>
          {saving ? t.admin.saving : t.admin.save}
        </Button>
      </div>
    </form>
  );
}
