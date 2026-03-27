import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ShieldCheck, ArrowLeft } from 'lucide-react'
import './AuthLayout.css'

import { API_URL } from '../config'}
                        </button>
                    </form>

                    <div className="auth-footer">
                        <p>Didn't receive a code? <button type="button" className="btn-link-elite" onClick={handleResend} disabled={loading}>Resend Code</button></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

