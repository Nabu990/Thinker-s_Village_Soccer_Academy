'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  RotateCcw, 
  Save, 
  Users, 
  UserPlus,
  Trash2,
  Play,
  Pause,
  ArrowRight,
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  Maximize2,
  Minimize2,
  Layers,
  X,
  Edit
} from 'lucide-react'

interface Player {
  id: string
  jerseyNumber: number
  name: string
  position: string
  x: number
  y: number
  isSubstitute: boolean
}

interface Formation {
  id: string
  name: string
  formation: string
  players: Player[]
}

interface TacticalFieldProps {
  formation: Formation
  onUpdateFormation: (formation: Formation) => void
}

export default function TacticalField({ formation, onUpdateFormation }: TacticalFieldProps) {
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showPlayerPaths, setShowPlayerPaths] = useState(false)
  const [formationType, setFormationType] = useState(formation.formation)
  const fieldRef = useRef<HTMLDivElement>(null)

  const handlePlayerDrag = (player: Player, newX: number, newY: number) => {
    const updatedPlayers = formation.players.map(p =>
      p.id === player.id ? { ...p, x: newX, y: newY } : p
    )
    onUpdateFormation({ ...formation, players: updatedPlayers })
  }

  const handlePlayerClick = (player: Player) => {
    setSelectedPlayer(player)
  }

  const toggleSubstitute = (playerId: string) => {
    const updatedPlayers = formation.players.map(p =>
      p.id === playerId ? { ...p, isSubstitute: !p.isSubstitute } : p
    )
    onUpdateFormation({ ...formation, players: updatedPlayers })
  }

  const resetFormation = () => {
    // Reset to default positions based on formation
    const defaultPositions = getDefaultPositions(formationType)
    const updatedPlayers = formation.players.map((player, index) => ({
      ...player,
      x: defaultPositions[index]?.x || player.x,
      y: defaultPositions[index]?.y || player.y
    }))
    onUpdateFormation({ ...formation, players: updatedPlayers, formation: formationType })
  }

  const changeFormation = (newFormation: string) => {
    setFormationType(newFormation)
    const defaultPositions = getDefaultPositions(newFormation)
    const updatedPlayers = formation.players.map((player, index) => ({
      ...player,
      x: defaultPositions[index]?.x || player.x,
      y: defaultPositions[index]?.y || player.y
    }))
    onUpdateFormation({ ...formation, players: updatedPlayers, formation: newFormation })
  }

  const getDefaultPositions = (formation: string) => {
    // Default positions for common formations
    const positions: { [key: string]: Array<{ x: number; y: number }> } = {
      '4-3-3': [
        { x: 50, y: 90 }, // GK
        { x: 20, y: 70 }, // RB
        { x: 35, y: 75 }, // CB
        { x: 65, y: 75 }, // CB
        { x: 80, y: 70 }, // LB
        { x: 35, y: 50 }, // CM
        { x: 50, y: 45 }, // CM
        { x: 65, y: 50 }, // CM
        { x: 20, y: 25 }, // RW
        { x: 50, y: 20 }, // ST
        { x: 80, y: 25 }, // LW
      ],
      '4-4-2': [
        { x: 50, y: 90 }, // GK
        { x: 20, y: 70 }, // RB
        { x: 35, y: 75 }, // CB
        { x: 65, y: 75 }, // CB
        { x: 80, y: 70 }, // LB
        { x: 20, y: 50 }, // RM
        { x: 35, y: 45 }, // CM
        { x: 65, y: 45 }, // CM
        { x: 80, y: 50 }, // LM
        { x: 35, y: 25 }, // ST
        { x: 65, y: 25 }, // ST
      ],
      '3-5-2': [
        { x: 50, y: 90 }, // GK
        { x: 25, y: 75 }, // CB
        { x: 50, y: 78 }, // CB
        { x: 75, y: 75 }, // CB
        { x: 15, y: 55 }, // RWB
        { x: 35, y: 50 }, // CM
        { x: 50, y: 45 }, // CDM
        { x: 65, y: 50 }, // CM
        { x: 85, y: 55 }, // LWB
        { x: 35, y: 25 }, // ST
        { x: 65, y: 25 }, // ST
      ],
      '4-2-3-1': [
        { x: 50, y: 90 }, // GK
        { x: 20, y: 70 }, // RB
        { x: 35, y: 75 }, // CB
        { x: 65, y: 75 }, // CB
        { x: 80, y: 70 }, // LB
        { x: 40, y: 55 }, // CDM
        { x: 60, y: 55 }, // CDM
        { x: 20, y: 35 }, // RAM
        { x: 50, y: 30 }, // CAM
        { x: 80, y: 35 }, // LAM
        { x: 50, y: 18 }, // ST
      ],
      '5-3-2': [
        { x: 50, y: 90 }, // GK
        { x: 15, y: 75 }, // CB
        { x: 35, y: 78 }, // CB
        { x: 65, y: 78 }, // CB
        { x: 85, y: 75 }, // CB
        { x: 50, y: 72 }, // SW
        { x: 25, y: 50 }, // CM
        { x: 50, y: 45 }, // CM
        { x: 75, y: 50 }, // CM
        { x: 35, y: 25 }, // ST
        { x: 65, y: 25 }, // ST
      ]
    }
    return positions[formation] || positions['4-3-3']
  }

  const startingPlayers = formation.players.filter(p => !p.isSubstitute)
  const substitutePlayers = formation.players.filter(p => p.isSubstitute)

  return (
    <div className={`${isFullscreen ? 'fixed inset-0 z-50 bg-gray-900 p-8' : 'space-y-6'}`}>
      {/* Formation Selector */}
      <Card className="card">
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium mr-2">Formation:</span>
            {['4-3-3', '4-4-2', '3-5-2', '4-2-3-1', '5-3-2'].map((fmt) => (
              <Button
                key={fmt}
                variant={formationType === fmt ? 'default' : 'outline'}
                size="sm"
                onClick={() => changeFormation(fmt)}
              >
                {fmt}
              </Button>
            ))}
            <div className="flex-1"></div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsFullscreen(!isFullscreen)}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4 mr-2" /> : <Maximize2 className="w-4 h-4 mr-2" />}
              {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowPlayerPaths(!showPlayerPaths)}
            >
              <Layers className="w-4 h-4 mr-2" />
              {showPlayerPaths ? 'Hide Paths' : 'Show Paths'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 3D Tactical Field */}
      <div 
        ref={fieldRef}
        className={`relative w-full aspect-[2/3] bg-gradient-to-b from-green-400 to-green-600 rounded-lg shadow-2xl overflow-hidden border-4 border-white transition-all duration-300 ${
          isFullscreen ? 'h-[80vh]' : ''
        }`}
        style={{
          perspective: '1000px',
          transformStyle: 'preserve-3d',
          transform: isFullscreen ? 'scale(1)' : 'scale(1)'
        }}
      >
        {/* Field markings */}
        <div className="absolute inset-0">
          {/* Center circle */}
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 border-4 border-white rounded-full opacity-60" />
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full opacity-80" />
          
          {/* Center line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-white opacity-60 transform -translate-x-1/2" />
          
          {/* Penalty areas */}
          <div className="absolute left-1/2 top-0 w-1/2 h-20 border-4 border-t-0 border-white opacity-60 transform -translate-x-1/2" />
          <div className="absolute left-1/2 bottom-0 w-1/2 h-20 border-4 border-b-0 border-white opacity-60 transform -translate-x-1/2" />
          
          {/* Goal areas */}
          <div className="absolute left-1/2 top-0 w-1/3 h-10 border-4 border-t-0 border-white opacity-60 transform -translate-x-1/2" />
          <div className="absolute left-1/2 bottom-0 w-1/3 h-10 border-4 border-b-0 border-white opacity-60 transform -translate-x-1/2" />
          
          {/* Penalty spots */}
          <div className="absolute left-1/2 top-14 w-3 h-3 bg-white rounded-full transform -translate-x-1/2 opacity-80 shadow-lg" />
          <div className="absolute left-1/2 bottom-14 w-3 h-3 bg-white rounded-full transform -translate-x-1/2 opacity-80 shadow-lg" />
          
          {/* Corner arcs */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-white rounded-tl-full opacity-60" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-white rounded-tr-full opacity-60" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-white rounded-bl-full opacity-60" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-white rounded-br-full opacity-60" />
          
          {/* Goals */}
          <div className="absolute left-1/2 top-0 w-16 h-2 bg-white transform -translate-x-1/2 opacity-80" />
          <div className="absolute left-1/2 bottom-0 w-16 h-2 bg-white transform -translate-x-1/2 opacity-80" />
        </div>

        {/* Players on field */}
        {startingPlayers.map((player) => (
          <motion.div
            key={player.id}
            drag
            dragMomentum={false}
            dragElastic={0}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={() => setIsDragging(false)}
            onDrag={(e, info) => {
              if (fieldRef.current) {
                const rect = fieldRef.current.getBoundingClientRect()
                const x = ((info.point.x - rect.left) / rect.width) * 100
                const y = ((info.point.y - rect.top) / rect.height) * 100
                handlePlayerDrag(player, Math.max(5, Math.min(95, x)), Math.max(5, Math.min(95, y)))
              }
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.15, boxShadow: '0 0 20px rgba(255,255,255,0.5)' }}
            whileDrag={{ scale: 1.25, zIndex: 100, boxShadow: '0 0 30px rgba(255,255,255,0.8)' }}
            className={`absolute cursor-grab active:cursor-grabbing ${
              selectedPlayer?.id === player.id ? 'z-50' : ''
            }`}
            style={{
              left: `${player.x}%`,
              top: `${player.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
            onClick={() => handlePlayerClick(player)}
          >
            <div className="relative">
              {/* Player circle with 3D effect */}
              <div className={`
                w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-2xl
                ${player.position === 'GK' ? 'bg-gradient-to-br from-yellow-400 to-yellow-600' : 
                  player.position.includes('B') ? 'bg-gradient-to-br from-blue-400 to-blue-600' :
                  player.position.includes('M') ? 'bg-gradient-to-br from-green-400 to-green-600' :
                  player.position.includes('F') || player.position.includes('W') || player.position === 'ST' ? 'bg-gradient-to-br from-red-400 to-red-600' :
                  'bg-gradient-to-br from-purple-400 to-purple-600'}
                ${selectedPlayer?.id === player.id ? 'ring-4 ring-white ring-offset-4 ring-offset-emerald-500' : ''}
              `}
              style={{
                boxShadow: selectedPlayer?.id === player.id 
                  ? '0 0 30px rgba(255,255,255,0.8)' 
                  : '0 4px 15px rgba(0,0,0,0.3)'
              }}
              >
                {player.jerseyNumber}
              </div>
              
              {/* Player name */}
              <div className="absolute -bottom-7 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                <span className="text-xs font-semibold text-white bg-black/70 backdrop-blur-sm px-2 py-1 rounded-md shadow-lg">
                  {player.name.split(' ').pop()}
                </span>
              </div>

              {/* Position indicator */}
              <div className="absolute -top-2 -right-2 w-5 h-5 bg-white rounded-full flex items-center justify-center text-xs font-bold shadow-md">
                {player.position.charAt(0)}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex space-x-2">
          <Button variant="outline" onClick={resetFormation}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset Positions
          </Button>
          <Button variant="default">
            <Save className="w-4 h-4 mr-2" />
            Save Formation
          </Button>
        </div>
        <Badge variant="secondary" className="text-sm">
          {formation.formation}
        </Badge>
      </div>

      {/* Substitutes Bench */}
      <Card className="card">
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <Users className="w-5 h-5 mr-2 text-primary-600" />
            Substitutes Bench
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            {substitutePlayers.map((player) => (
              <motion.div
                key={player.id}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="relative group cursor-pointer"
                onClick={() => toggleSubstitute(player.id)}
              >
                <div 
                  className={`
                    w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-2xl
                    ${player.position === 'GK' ? 'bg-gradient-to-br from-yellow-400 to-yellow-600' : 
                      player.position.includes('B') ? 'bg-gradient-to-br from-blue-400 to-blue-600' :
                      player.position.includes('M') ? 'bg-gradient-to-br from-green-400 to-green-600' :
                      player.position.includes('F') || player.position.includes('W') || player.position === 'ST' ? 'bg-gradient-to-br from-red-400 to-red-600' :
                      'bg-gradient-to-br from-purple-400 to-purple-600'}
                  `}
                  style={{
                    boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
                  }}
                >
                  {player.jerseyNumber}
                </div>
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                  <span className="text-xs font-semibold text-gray-700">{player.name.split(' ').pop()}</span>
                </div>
                <Badge className="absolute -top-2 -right-2 text-xs bg-orange-500 shadow-md">
                  SUB
                </Badge>
                <div className="absolute inset-0 rounded-full border-2 border-white opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </motion.div>
            ))}
            {substitutePlayers.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <Users className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No substitutes assigned</p>
                <p className="text-xs mt-1">Click on players to make them substitutes</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Selected Player Details */}
      <AnimatePresence>
        {selectedPlayer && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card className="card border-2 border-emerald-500 shadow-xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div 
                      className={`
                        w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-2xl
                        ${selectedPlayer.position === 'GK' ? 'bg-gradient-to-br from-yellow-400 to-yellow-600' : 
                          selectedPlayer.position.includes('B') ? 'bg-gradient-to-br from-blue-400 to-blue-600' :
                          selectedPlayer.position.includes('M') ? 'bg-gradient-to-br from-green-400 to-green-600' :
                          selectedPlayer.position.includes('F') || selectedPlayer.position.includes('W') || selectedPlayer.position === 'ST' ? 'bg-gradient-to-br from-red-400 to-red-600' :
                          'bg-gradient-to-br from-purple-400 to-purple-600'}
                      `}
                    >
                      {selectedPlayer.jerseyNumber}
                    </div>
                    <div>
                      <CardTitle className="text-2xl">#{selectedPlayer.jerseyNumber} {selectedPlayer.name}</CardTitle>
                      <Badge className="mt-2" variant="secondary">{selectedPlayer.position}</Badge>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setSelectedPlayer(null)}>
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Current Position</p>
                      <p className="font-semibold text-lg">
                        X: {selectedPlayer.x.toFixed(1)}%, Y: {selectedPlayer.y.toFixed(1)}%
                      </p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Status</p>
                      <Badge className={selectedPlayer.isSubstitute ? 'bg-orange-500' : 'bg-green-500'}>
                        {selectedPlayer.isSubstitute ? 'Substitute' : 'Starting XI'}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button 
                      variant={selectedPlayer.isSubstitute ? "default" : "outline"}
                      onClick={() => toggleSubstitute(selectedPlayer.id)}
                      className="flex-1"
                    >
                      {selectedPlayer.isSubstitute ? (
                        <>
                          <Play className="w-4 h-4 mr-2" />
                          Make Starter
                        </>
                      ) : (
                        <>
                          <Pause className="w-4 h-4 mr-2" />
                          Make Substitute
                        </>
                      )}
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Player
                    </Button>
                  </div>

                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <ArrowUp className="w-4 h-4 mr-1" />
                      Move Up
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <ArrowDown className="w-4 h-4 mr-1" />
                      Move Down
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Move Left
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <ArrowRight className="w-4 h-4 mr-1" />
                      Move Right
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
