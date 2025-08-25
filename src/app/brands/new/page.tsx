'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BrandsService } from '@/services/brands';
import PageHeader from '@/components/PageHeader';

export default function CreateBrandPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const [formData, setFormData] = useState({
    brand_name: '',
    owner_name: '',
  });

  const steps = [
    {
      id: 1,
      title: 'Información de la marca',
      description: 'Ingresa el nombre de la marca que deseas registrar',
    },
    {
      id: 2,
      title: 'Información del titular',
      description: 'Especifica quién será el propietario de esta marca',
    },
    {
      id: 3,
      title: 'Resumen',
      description: 'Revisa la información antes de crear la marca',
    },
  ];

  const goToNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goToPrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setNotification(null);

    try {
      await BrandsService.create(formData);

      // Mostrar notificación de éxito
      setNotification({
        type: 'success',
        message: '¡Marca creada exitosamente!',
      });

      // Redirigir después de 2 segundos
      setTimeout(() => {
        router.push('/');
      }, 2000);
    } catch (error: unknown) {
      // Manejar errores de validación
      const err = error as { errors?: { brand_name?: string[] }; message?: string };
      if (err.errors?.brand_name) {
        setNotification({
          type: 'error',
          message: err.errors.brand_name[0],
        });
      } else {
        setNotification({
          type: 'error',
          message: err.message || 'Error al crear la marca',
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const canContinue = () => {
    if (currentStep === 1) return formData.brand_name.trim() !== '';
    if (currentStep === 2) return formData.owner_name.trim() !== '';
    return true;
  };

  return (
    <div className="space-y-6 p-8">
      <PageHeader
        title="Nueva Marca"
        subtitle="Registra una nueva marca siguiendo nuestro proceso guiado"
      />

      {/* Notification */}
      {notification && (
        <div
          className={`fixed top-8 right-8 z-50 transform transition-all duration-300 ${
            notification.type === 'success'
              ? 'bg-green-500/20 border-green-500/30 text-green-300'
              : 'bg-red-500/20 border-red-500/30 text-red-300'
          } backdrop-blur-xl border rounded-2xl p-4 shadow-lg`}
        >
          <div className="flex items-center space-x-3">
            <div
              className={`w-2 h-2 rounded-full ${
                notification.type === 'success' ? 'bg-green-400' : 'bg-red-400'
              } animate-pulse`}
            ></div>
            <p className="font-medium">{notification.message}</p>
          </div>
        </div>
      )}
      <div className="max-w-2xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                    currentStep >= step.id
                      ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg'
                      : 'bg-white/10 text-white/50 border border-white/20'
                  }`}
                >
                  {currentStep > step.id ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    step.id
                  )}
                </div>
                {step.id < 3 && (
                  <div
                    className={`h-1 w-24 mx-4 rounded transition-all duration-300 ${
                      currentStep > step.id
                        ? 'bg-gradient-to-r from-purple-500 to-blue-500'
                        : 'bg-white/20'
                    }`}
                  ></div>
                )}
              </div>
            ))}
          </div>
        </div>
        {/* Main Card */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-purple-600/20 rounded-3xl blur-xl"></div>
          <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-8 shadow-2xl">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                {steps[currentStep - 1].title}
              </h1>
              <p className="text-white/60">{steps[currentStep - 1].description}</p>
            </div>
            {/* Step Content */}
            <div className="min-h-[200px] flex flex-col justify-center">
              {/* Step 1: Brand Name */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <label
                      htmlFor="brand-name"
                      className="block text-white/80 text-sm font-medium mb-3"
                    >
                      Marca a registrar
                    </label>
                    <input
                      id="brand-name"
                      type="text"
                      value={formData.brand_name}
                      onChange={(e) => setFormData({ ...formData, brand_name: e.target.value })}
                      placeholder="Ingresa el nombre de la marca"
                      className="w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-6 py-4 text-white text-lg placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-200"
                      autoFocus
                    />
                  </div>
                </div>
              )}
              {/* Step 2: Owner Name */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <label
                      htmlFor="owner-name"
                      className="block text-white/80 text-sm font-medium mb-3"
                    >
                      Titular de la marca
                    </label>
                    <input
                      id="owner-name"
                      type="text"
                      value={formData.owner_name}
                      onChange={(e) => setFormData({ ...formData, owner_name: e.target.value })}
                      placeholder="Ingresa el nombre del titular"
                      className="w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-6 py-4 text-white text-lg placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-200"
                      autoFocus
                    />
                  </div>
                </div>
              )}
              {/* Step 3: Summary */}
              {currentStep === 3 && (
                <div className="space-y-8">
                  <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                    <h3 className="text-white/80 text-sm font-medium mb-6 uppercase tracking-wider">
                      Información a registrar
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between py-3 border-b border-white/10">
                        <span className="text-white/60">Marca a registrar</span>
                        <span className="text-white font-semibold text-lg">
                          {formData.brand_name}
                        </span>
                      </div>
                      <div className="flex items-center justify-between py-3">
                        <span className="text-white/60">Titular de la marca</span>
                        <span className="text-white font-semibold text-lg">
                          {formData.owner_name}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {/* Actions */}
            <div className="flex items-center justify-between mt-8 pt-8 border-t border-white/10">
              <button
                onClick={goToPrevStep}
                disabled={currentStep === 1}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  currentStep === 1
                    ? 'opacity-50 cursor-not-allowed text-white/40'
                    : 'bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 text-white hover:scale-105'
                }`}
              >
                Atrás
              </button>
              <div className="flex space-x-4">
                {currentStep < 3 ? (
                  <button
                    onClick={goToNextStep}
                    disabled={!canContinue()}
                    className={`px-8 py-3 rounded-xl font-medium transition-all duration-200 ${
                      canContinue()
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white shadow-lg hover:scale-105'
                        : 'bg-gray-500/20 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    Continuar
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting || !canContinue()}
                    className={`px-8 py-3 rounded-xl font-medium transition-all duration-200 flex items-center space-x-2 ${
                      isSubmitting || !canContinue()
                        ? 'bg-gray-500/20 text-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white shadow-lg hover:scale-105'
                    }`}
                  >
                    {isSubmitting && (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    )}
                    <span>{isSubmitting ? 'Creando...' : 'Crear marca'}</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
