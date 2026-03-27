import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Camera,
    X,
    ArrowRight,
    Check,
    ArrowLeft,
    Package,
    Info
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

