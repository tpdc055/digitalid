"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Shield,
  User,
  Settings,
  ChevronDown,
  Home,
  UserCircle,
  Building,
  LogOut,
  Bell,
  Globe
} from 'lucide-react';
import Link from 'next/link';
import { useLanguage, Language } from '@/contexts/LanguageContext';

interface TopNavProps {
  currentPortal?: 'citizen' | 'admin' | 'service-provider';
  onPortalChange?: (portal: 'citizen' | 'admin' | 'service-provider') => void;
}

export default function TopNavigation({
  currentPortal = 'citizen',
  onPortalChange = () => {}
}: TopNavProps) {
  const [showPortalDropdown, setShowPortalDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const portalConfigs = {
    citizen: {
      name: "Citizen Portal",
      icon: User,
      color: "bg-blue-600",
      description: "Digital identity and government services for PNG citizens"
    },
    admin: {
      name: "Admin Portal",
      icon: Shield,
      color: "bg-red-600",
      description: "Administrative oversight and system management"
    },
    "service-provider": {
      name: "Service Provider Portal",
      icon: Building,
      color: "bg-green-600",
      description: "Integration platform for government service providers"
    }
  };

  const languageConfig = {
    en: { name: 'English', flag: '🇬🇧' },
    tpi: { name: 'Tok Pisin', flag: '🇵🇬' },
    ho: { name: 'Hiri Motu', flag: '🇵🇬' }
  };

  const currentConfig = portalConfigs[currentPortal];
  const CurrentIcon = currentConfig.icon;

  return (
    <nav className="bg-gradient-to-r from-red-600 via-black to-yellow-500 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Portal Selector */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-3">
              <Shield className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-white">
                Enhanced Security Framework
              </span>
            </Link>

            {/* Portal Selector */}
            <div className="relative">
              <Button
                variant="outline"
                onClick={() => setShowPortalDropdown(!showPortalDropdown)}
                className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${currentConfig.color}`} />
                <CurrentIcon className="h-4 w-4" />
                {currentConfig.name}
                <ChevronDown className="h-4 w-4" />
              </Button>

              {showPortalDropdown && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg z-50">
                  {Object.entries(portalConfigs).map(([key, config]) => {
                    const IconComponent = config.icon;
                    return (
                      <button
                        key={key}
                        onClick={() => {
                          onPortalChange(key as any);
                          setShowPortalDropdown(false);
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-700 first:rounded-t-lg last:rounded-b-lg ${
                          currentPortal === key ? 'bg-slate-50 dark:bg-slate-700' : ''
                        }`}
                      >
                        <div className={`w-3 h-3 rounded-full ${config.color}`} />
                        <IconComponent className="h-4 w-4" />
                        <span className="font-medium">{config.name}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Right Side - Language, Notifications and User */}
          <div className="flex items-center gap-4">
            {/* Language Selector */}
            <div className="relative">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                <span>{languageConfig[language].flag}</span>
                <span className="hidden md:inline">{languageConfig[language].name}</span>
                <ChevronDown className="h-3 w-3" />
              </Button>

              {showLanguageDropdown && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg z-50">
                  {Object.entries(languageConfig).map(([code, config]) => (
                    <button
                      key={code}
                      onClick={() => {
                        setLanguage(code as Language);
                        setShowLanguageDropdown(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-700 first:rounded-t-lg last:rounded-b-lg ${
                        language === code ? 'bg-slate-50 dark:bg-slate-700' : ''
                      }`}
                    >
                      <span className="text-lg">{config.flag}</span>
                      <span className="font-medium">{config.name}</span>
                      {code === 'tpi' && <span className="text-xs text-slate-500">(Tok Pisin)</span>}
                      {code === 'ho' && <span className="text-xs text-slate-500">(Hiri Motu)</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Notifications */}
            <Button variant="outline" size="sm" className="relative">
              <Bell className="h-4 w-4" />
              <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                3
              </Badge>
            </Button>

            {/* User Menu */}
            <div className="relative">
              <Button
                variant="outline"
                onClick={() => setShowUserDropdown(!showUserDropdown)}
                className="flex items-center gap-2">
                <UserCircle className="h-4 w-4" />
                <span>John Doe</span>
                <ChevronDown className="h-4 w-4" />
              </Button>

              {showUserDropdown && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg z-50">
                  <div className="p-3 border-b border-slate-200 dark:border-slate-700">
                    <p className="font-medium">John Doe</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">john.doe@gov.pg</p>
                  </div>
                  <div className="p-1">
                    <button className="w-full flex items-center gap-2 px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-700 rounded">
                      <UserCircle className="h-4 w-4" />
                      Profile
                    </button>
                    <button className="w-full flex items-center gap-2 px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-700 rounded">
                      <Settings className="h-4 w-4" />
                      Settings
                    </button>
                    <hr className="my-1 border-slate-200 dark:border-slate-700" />
                    <button className="w-full flex items-center gap-2 px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-700 rounded text-red-600">
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
