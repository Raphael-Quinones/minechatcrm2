"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

import ProjectModuleMenu from "./menu-items/Projects";
import SecondBrainModuleMenu from "./menu-items/SecondBrain";
import InvoicesModuleMenu from "./menu-items/Invoices";
import ReportsModuleMenu from "./menu-items/Reports";
import DocumentsModuleMenu from "./menu-items/Documents";
import ChatGPTModuleMenu from "./menu-items/ChatGPT";
import EmployeesModuleMenu from "./menu-items/Employees";
import DataboxModuleMenu from "./menu-items/Databoxes";
import CrmModuleMenu from "./menu-items/Crm";

import AdministrationMenu from "./menu-items/Administration";
import DashboardMenu from "./menu-items/Dashboard";
import EmailsModuleMenu from "./menu-items/Emails";
import { cn } from "@/lib/utils";

type Props = {
  modules: any;
  dict: any;
  build: number;
};

const ModuleMenu = ({ modules, dict, build }: Props) => {
  const [open, setOpen] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex flex-col">
      {/* Logo and Toggle Button */}
      <div className="flex items-center p-5 pt-8">
        <div
          className="cursor-pointer duration-500 border rounded-full p-2"
          onClick={() => setOpen(!open)}
        >
          <Image
            src="/favicon.ico"
            alt="Menu Toggle"
            width={16}
            height={16}
            className={`w-4 h-4 transition-transform duration-500 ${
              open ? "rotate-[360deg]" : ""
            }`}
          />
        </div>

        {/* App Name */}
        {open && (
          <h1 className="ml-4 origin-left font-medium text-xl whitespace-nowrap">
            {process.env.NEXT_PUBLIC_APP_NAME}
          </h1>
        )}
      </div>

      {/* Sidebar Menu */}
      <div
        className={`flex-1 h-screen p-5 pt-2 relative duration-300 ${
          open ? "w-72" : "w-20"
        }`}
      >
        <div className="pt-6">
          <DashboardMenu open={open} title={dict.ModuleMenu.dashboard} />
          {modules.find(
            (menuItem: any) => menuItem.name === "crm" && menuItem.enabled
          ) ? (
            <CrmModuleMenu open={open} localizations={dict.ModuleMenu.crm} />
          ) : null}
          {modules.find(
            (menuItem: any) => menuItem.name === "projects" && menuItem.enabled
          ) ? (
            <ProjectModuleMenu open={open} title={dict.ModuleMenu.projects} />
          ) : null}
          {modules.find(
            (menuItem: any) => menuItem.name === "emails" && menuItem.enabled
          ) ? (
            <EmailsModuleMenu open={open} title={dict.ModuleMenu.emails} />
          ) : null}
          {modules.find(
            (menuItem: any) => menuItem.name === "secondBrain" && menuItem.enabled
          ) ? (
            <SecondBrainModuleMenu open={open} />
          ) : null}
          {modules.find(
            (menuItem: any) => menuItem.name === "employee" && menuItem.enabled
          ) ? (
            <EmployeesModuleMenu open={open} />
          ) : null}
          {modules.find(
            (menuItem: any) => menuItem.name === "invoice" && menuItem.enabled
          ) ? (
            <InvoicesModuleMenu open={open} title={dict.ModuleMenu.invoices} />
          ) : null}
          {modules.find(
            (menuItem: any) => menuItem.name === "reports" && menuItem.enabled
          ) ? (
            <ReportsModuleMenu open={open} title={dict.ModuleMenu.reports} />
          ) : null}
          {modules.find(
            (menuItem: any) => menuItem.name === "documents" && menuItem.enabled
          ) ? (
            <DocumentsModuleMenu
              open={open}
              title={dict.ModuleMenu.documents}
            />
          ) : null}
          {modules.find(
            (menuItem: any) => menuItem.name === "databox" && menuItem.enabled
          ) ? (
            <DataboxModuleMenu open={open} />
          ) : null}
          {modules.find(
            (menuItem: any) => menuItem.name === "openai" && menuItem.enabled
          ) ? (
            <ChatGPTModuleMenu open={open} />
          ) : null}
          {modules.find(
            (menuItem: any) => menuItem.name === "administration" && menuItem.enabled
          ) ? (
            <AdministrationMenu open={open} title={dict.ModuleMenu.settings} />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ModuleMenu;
