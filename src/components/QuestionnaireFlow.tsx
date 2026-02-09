import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LoginStep } from './steps/LoginStep';
import { IntroductionStep } from './steps/IntroductionStep';
import { WelcomeStep } from './steps/WelcomeStep';
import { BasicInfoStep } from './steps/BasicInfoStep';
import { DateLocationStep } from './steps/DateLocationStep';
import { TimeScheduleStep } from './steps/TimeScheduleStep';
import { FamilyInfoStep } from './steps/FamilyInfoStep';
import { StoryStep } from './steps/StoryStep';
import { StatsStep } from './steps/StatsStep';
import { DesignStep } from './steps/DesignStep';
import { RsvpStep } from './steps/RsvpStep';
import { MessagesStep } from './steps/MessagesStep';
import { SaveToast } from './ui/SaveToast';

export type QuestionnaireData = {
  // Section 1: Basic Info
  brideName?: string;
  groomName?: string;
  nameDisplayPreference?: string; // "Nombres de pila", "Con apellidos", "Variación cariñosa"
  
  // Section 2: Date & Location
  weddingDate?: string;
  ceremonyPlace?: string;
  ceremonyAddress?: string;
  receptionPlace?: string;
  receptionAddress?: string;
  isSameLocation?: boolean;

  // Section 3: Schedule
  ceremonyTime?: string;
  receptionTime?: string;
  otherEvents?: string;

  // Section 4: Family
  brideMother?: string;
  brideFather?: string;
  groomMother?: string;
  groomFather?: string;
  padrinosAnillos?: string;
  padrinosLazo?: string;
  otherPadrinos?: string;

  // Section 5: Story
  dateMet?: string;
  dateFirstDate?: string;
  dateEngagement?: string;
  storyMet?: string;
  storyFirstDate?: string;
  storyProposal?: string;

  // Section 6: Stats
  guestCount?: string;
  daysTogether?: string;
  otherStats?: string;

  // Section 7: Design & Preferences
  designStyle?: string;
  colorHarmony?: string;
  customColors?: string;
  withMusic?: boolean;
  musicStyle?: string;
  designNotes?: string;

  // Section 8: RSVP
  rsvpPhone?: string;
  rsvpDeadline?: string;

  // Section 8: Additional
  instagram?: string;
  facebook?: string;
  hashtag?: string;
  specialMessage?: string;
  dressCode?: string;
  extraInfo?: string;
};

const STEPS = [
  'Welcome',
  'BasicInfo',
  'DateLocation',
  'TimeSchedule',
  'FamilyInfo',
  'Story',
  'Stats',
  'Design',
  'Rsvp',
  'Messages'
] as const;

type StepName = typeof STEPS[number];

import { AdminPanel } from './AdminPanel';

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0
  })
};

import { CompletionStep } from './steps/CompletionStep';

export const QuestionnaireFlow = () => {
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<'admin' | 'user' | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [data, setData] = useState<QuestionnaireData>({});
  const [direction, setDirection] = useState(1);
  const [isSaving, setIsSaving] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const [showSaveToast, setShowSaveToast] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentStep = STEPS[currentStepIndex];

  // Load progress when user logs in
  useEffect(() => {
    if (currentUser && userRole !== 'admin') {
        fetch(`/api/progress?username=${currentUser}`)
            .then(res => res.json())
            .then(savedData => {
                if (savedData && Object.keys(savedData).length > 0) {
                    setData(savedData);
                }
            })
            .catch(err => console.error("Error loading progress:", err));
    }
  }, [currentUser, userRole]);

  const saveData = async (newData: QuestionnaireData) => {
    if (!currentUser) return;
    setIsSaving(true);
    try {
        await fetch('/api/save', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: currentUser, data: newData })
        });
    } catch (error) {
        console.error("Error saving data:", error);
    } finally {
        setIsSaving(false);
    }
  };

  const handleNext = async (stepData?: any) => {
    const newData = { ...data, ...stepData };
    setData(newData);
    await saveData(newData); // Wait for save to complete
    
    if (currentStepIndex < STEPS.length - 1) {
        setDirection(1);
        setCurrentStepIndex(prev => prev + 1);
        // Show save toast (but not on first step/Welcome)
        if (currentStepIndex > 0) {
          setShowSaveToast(true);
        }
    } else {
        // Last step completed
        setIsCompleted(true);
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
        setDirection(-1);
        setCurrentStepIndex(prev => prev - 1);
    }
  };

  const handleLogin = (username: string, role: 'admin' | 'user' = 'user') => {
      setCurrentUser(username);
      setUserRole(role);
      setIsCompleted(false);
      // Show intro for non-admin users
      if (role !== 'admin') {
        setShowIntro(true);
      }
  };

  const handleCompleteIntro = () => {
      setShowIntro(false);
  };

  const handleLogout = () => {
      // Stop audio on logout
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      setCurrentUser(null);
      setUserRole(null);
      setData({});
      setCurrentStepIndex(0);
      setIsCompleted(false);
      setShowIntro(false);
  };

  if (!currentUser) {
    return (
      <div className="relative w-full h-screen-safe overflow-y-auto overflow-x-hidden bg-background-light dark:bg-background-dark text-slate-900 dark:text-white">
             {/* Pass modified handler that expects role */}
             <LoginStep onLogin={(user, role) => handleLogin(user, role as any)} />
        </div>
    );
  }

  if (userRole === 'admin') {
      return <AdminPanel currentUser={currentUser} onLogout={handleLogout} />;
  }

  if (isCompleted) {
      // Stop audio on completion
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      return <CompletionStep onLogout={handleLogout} />;
  }

  // Show introduction flow
  if (showIntro) {
      return (
        <div className="relative w-full h-screen-safe overflow-y-auto overflow-x-hidden bg-background-light dark:bg-background-dark text-slate-900 dark:text-white">
          {/* Audio element at top level so it persists */}
          <audio ref={audioRef} src="/studio.mp3" loop preload="auto" />
          <IntroductionStep onComplete={handleCompleteIntro} audioRef={audioRef} />
        </div>
      );
  }

  return (
    <div className="relative w-full h-screen-safe overflow-y-auto overflow-x-hidden bg-background-light dark:bg-background-dark text-slate-900 dark:text-white flex flex-col items-center justify-start pt-safe">
      {/* Audio element persists through all questionnaire steps */}
      <audio ref={audioRef} src="/studio.mp3" loop preload="auto" />
      
      {/* Header / Progress */}
      <header className="absolute top-0 left-0 w-full z-20 flex items-center justify-between p-6 max-w-md mx-auto right-0">
        {currentStepIndex > 0 && (
          <button onClick={handleBack} className="flex items-center justify-center text-slate-900 dark:text-white hover:text-primary transition-colors">
            <span className="material-symbols-outlined !text-[28px]">arrow_back</span>
          </button>
        )}
        <div className="flex-1"></div>
        <div className="flex flex-col items-end">
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-primary">
                {currentUser} {isSaving && <span className="animate-pulse">...</span>}
            </span>
            <div className="flex items-center gap-2 mt-1">
                <span className="text-xs font-mono opacity-40">STEP</span>
                <span className="text-sm font-bold font-mono tracking-widest text-primary">
                    {String(currentStepIndex).padStart(2, '0')}/{String(STEPS.length - 1).padStart(2, '0')}
                </span>
            </div>
        </div>
      </header>


      <main className="relative w-full max-w-md h-full flex flex-col">
        <AnimatePresence initial={false} custom={direction} mode='wait'>
          <motion.div
            key={currentStepIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            className="flex-1 w-full h-full absolute top-0 left-0 overflow-y-auto"
          >
             {currentStep === 'Welcome' && <WelcomeStep onNext={() => handleNext()} />}
             {currentStep === 'BasicInfo' && <BasicInfoStep onNext={handleNext} data={data} />}
             {currentStep === 'DateLocation' && <DateLocationStep onNext={handleNext} data={data} />}
             {currentStep === 'TimeSchedule' && <TimeScheduleStep onNext={handleNext} data={data} />}
             {currentStep === 'FamilyInfo' && <FamilyInfoStep onNext={handleNext} data={data} />}
             {currentStep === 'Story' && <StoryStep onNext={handleNext} data={data} />}
             {currentStep === 'Stats' && <StatsStep onNext={handleNext} data={data} />}
             {currentStep === 'Design' && <DesignStep onNext={handleNext} data={data} />}
             {currentStep === 'Rsvp' && <RsvpStep onNext={handleNext} data={data} />}
             {currentStep === 'Messages' && <MessagesStep onNext={handleNext} data={data} />}
          </motion.div>
        </AnimatePresence>
      </main>
      
      {/* Save Toast Notification */}
      <SaveToast show={showSaveToast} onHide={() => setShowSaveToast(false)} />
    </div>
  );
};
