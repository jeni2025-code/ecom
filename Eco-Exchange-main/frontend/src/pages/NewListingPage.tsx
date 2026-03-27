import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Camera,
    Upload,
    X,
    Sparkles,
    ArrowRight,
    Info,
    Package,
    Check,
    TrendingUp
} from 'lucide-react'
import './NewListingPage.css'

import { API_URL } from '../config'}</span>
                                </button>
                            </div>
                            {error && <p style={{ color: '#ef4444', marginTop: '16px', textAlign: 'center' }}>{error}</p>}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}

