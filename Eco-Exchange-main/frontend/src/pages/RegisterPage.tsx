import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
// removed unused icons
import './AuthLayout.css'

import { API_URL } from '../config'}
                        </button>
                    </form>

                    <div className="auth-footer">
                        <p>Already a member? <Link to="/login">Sign In</Link></p>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

