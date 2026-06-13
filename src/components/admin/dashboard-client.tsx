"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ExternalLink,
  LogOut,
  Pencil,
  Plus,
  RefreshCw,
  Trash2,
} from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { createClient } from "@/lib/supabase/client";
import { useLanguage } from "@/lib/i18n/context";
import { Project } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Modal } from "@/components/ui/modal";
import { ProjectForm } from "./project-form";
import { LanguageToggle } from "@/components/language-toggle";
import { ThemeToggle } from "@/components/theme-toggle";

export function DashboardClient({
  initialProjects,
}: {
  initialProjects: Project[];
}) {
  const { t } = useLanguage();
  const router = useRouter();
  const supabase = createClient();

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [syncing, setSyncing] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  function refresh() {
    router.refresh();
  }

  async function toggleVisible(project: Project) {
    setBusyId(project.id);
    await supabase
      .from("projects")
      .update({ is_visible: !project.is_visible })
      .eq("id", project.id);
    setBusyId(null);
    refresh();
  }

  async function remove(project: Project) {
    if (!window.confirm(t.admin.delete_confirm)) return;
    setBusyId(project.id);
    await supabase.from("projects").delete().eq("id", project.id);
    setBusyId(null);
    refresh();
  }

  async function signOut() {
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  async function syncGitHub() {
    setSyncing(true);
    setNotice(null);
    try {
      const res = await fetch("/api/github/sync", { method: "POST" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "sync failed");
      setNotice(`${t.admin.synced} (${data.synced})`);
      refresh();
    } catch {
      setNotice(t.admin.error_generic);
    } finally {
      setSyncing(false);
    }
  }

  function openNew() {
    setEditing(null);
    setModalOpen(true);
  }

  function openEdit(project: Project) {
    setEditing(project);
    setModalOpen(true);
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            {t.admin.dashboard}
          </h1>
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            ← {t.admin.back_to_site}
          </Link>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <LanguageToggle />
          <ThemeToggle />
          <Button variant="outline" onClick={syncGitHub} disabled={syncing}>
            <RefreshCw
              className={syncing ? "h-4 w-4 animate-spin" : "h-4 w-4"}
            />
            {syncing ? t.admin.syncing : t.admin.sync_github}
          </Button>
          <Button onClick={openNew}>
            <Plus className="h-4 w-4" />
            {t.admin.add_project}
          </Button>
          <Button variant="ghost" onClick={signOut} aria-label={t.admin.sign_out}>
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {notice && (
        <p className="mb-4 rounded-[var(--radius)] border border-primary/30 bg-primary/10 px-3 py-2 text-sm text-primary">
          {notice}
        </p>
      )}

      {/* Table */}
      <div className="overflow-x-auto rounded-[var(--radius)] border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/40 text-left font-mono text-xs uppercase tracking-wider text-muted-foreground">
              <th className="px-4 py-3 font-medium">{t.admin.col_title}</th>
              <th className="px-4 py-3 font-medium">{t.admin.col_type}</th>
              <th className="px-4 py-3 text-center font-medium">
                {t.admin.col_order}
              </th>
              <th className="px-4 py-3 text-center font-medium">
                {t.admin.col_visible}
              </th>
              <th className="px-4 py-3 text-right font-medium">
                {t.admin.col_actions}
              </th>
            </tr>
          </thead>
          <tbody>
            {initialProjects.map((project) => (
              <tr
                key={project.id}
                className="border-b border-border last:border-0 hover:bg-muted/30"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2 font-medium">
                    {project.title}
                    {project.github_repo_url && (
                      <a
                        href={project.github_repo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <GithubIcon className="h-3.5 w-3.5" />
                      </a>
                    )}
                    {project.app_store_url && (
                      <a
                        href={project.app_store_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <Badge variant="mono">{project.type}</Badge>
                </td>
                <td className="px-4 py-3 text-center font-mono text-muted-foreground">
                  {project.display_order}
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-center">
                    <Switch
                      checked={project.is_visible}
                      disabled={busyId === project.id}
                      onCheckedChange={() => toggleVisible(project)}
                      aria-label={t.admin.col_visible}
                    />
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-1">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => openEdit(project)}
                      aria-label={t.admin.edit}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => remove(project)}
                      disabled={busyId === project.id}
                      aria-label={t.admin.delete}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
            {initialProjects.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-10 text-center text-muted-foreground"
                >
                  {t.projects.empty}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? t.admin.form_title_edit : t.admin.form_title_new}
      >
        <ProjectForm
          project={editing}
          onClose={() => setModalOpen(false)}
          onSaved={() => {
            setModalOpen(false);
            refresh();
          }}
        />
      </Modal>
    </div>
  );
}
