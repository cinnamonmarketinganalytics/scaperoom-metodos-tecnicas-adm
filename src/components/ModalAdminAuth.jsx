import React, { useState } from 'react';
import { ShieldCheck, Lock, X, AlertCircle } from 'lucide-react';

// Salt e Hash criptográfico unidirecional SHA-256 para autenticação do Docente
// A senha em texto claro não existe no código nem no repositório
const AUTH_SALT = 'adm_escape_salt_98421_sec';
const AUTH_HASH = '6bbecf9a3fb06fad565c0083824752d0237208b55ed94558a88746942f30c1b6';

async function verifyHash(inputPassword) {
  if (!inputPassword) return false;
  try {
    const encoder = new TextEncoder();
    const data = encoder.encode(AUTH_SALT + inputPassword.trim());
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex === AUTH_HASH;
  } catch (err) {
    console.error('Erro na validação criptográfica:', err);
    return false;
  }
}

export default function ModalAdminAuth({ isOpen, onClose, onSuccess }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [isValidating, setIsValidating] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password.trim() || isValidating) return;

    setIsValidating(true);
    const isValid = await verifyHash(password);
    setIsValidating(false);

    if (isValid) {
      setError(false);
      setPassword('');
      onSuccess();
    } else {
      setError(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md p-6 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-200 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 bg-cyan-950/80 border border-cyan-700/60 rounded-xl text-cyan-400">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white font-tech">Acesso do Professor</h3>
            <p className="text-xs text-slate-400">Autenticação criptográfica de alta segurança</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Senha de Acesso
            </label>
            <div className="relative">
              <input
                type="password"
                autoFocus
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError(false);
                }}
                placeholder="Digite a senha de administrador..."
                className={`w-full px-4 py-2.5 pl-10 rounded-xl bg-slate-950 border text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 transition ${
                  error 
                    ? 'border-rose-500 focus:ring-rose-500' 
                    : 'border-slate-700 focus:border-cyan-500 focus:ring-cyan-500/20'
                }`}
              />
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
            </div>
            {error && (
              <p className="flex items-center gap-1.5 text-xs text-rose-400 mt-2 font-medium">
                <AlertCircle className="w-3.5 h-3.5" />
                Senha incorreta. Acesso restrito ao corpo docente.
              </p>
            )}
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-slate-200 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isValidating || !password.trim()}
              className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/20 transition transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isValidating ? 'Validando Hash...' : 'Autenticar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
