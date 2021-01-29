<CsoundSynthesizer>
<CsOptions>
</CsOptions>
<CsInstruments>
; Initialize the global variables.
sr                  =             44100
kr                  =             1764
ksmps               =             25
nchnls              =             2

; Instrument 1
; figuren met hetzelfde wiel
; luistert naar alle OSC boodschappen
                    instr         1
kwiel               init          30
iamp                init          32000
irr                 init          3.05
ifactor             init          9
ifreq               init          kr / ifactor
iringidx            init          p4
iring               table         iringidx, 6

kcnt                init          0

kgat                chnget        "hole"
kfase               chnget        "phase"


kwiel1              chnget        "wheel"
kfase2              chnget        "phase2"
kfigs               chnget        "figs"

kwiel               table         16 * kwiel1, 3
krondjes            table         16 * kwiel1, iringidx + 4

kfreq               =             ifreq * krondjes
kwr                 =             kwiel / iring
ka                  =             1 - kwr

ktblidx             =             kcnt / ifactor % floor(kfigs*10)
kcnt                =             kcnt + 1

apha1               phasor        kfreq
kfase2a             =             kfase2 * 4 - 2
afase1              =             apha1 + ktblidx * kfase2a / iring + kfase
apha2               phasor        kfreq * (kwr - 1) / kwr
afase2              =             apha2 + ktblidx * kfase2a / iring + kfase
kb                  =             kwr - (0.0647059 * (ktblidx + kgat * 10.0 - 1.0) + 0.31) / irr
a1                  table         afase1, 1, 1, 0, 1
a2                  table         afase2, 1, 1, 0, 1
a3                  table         afase1, 2, 1, 0, 1
a4                  table         afase2, 2, 1, 0, 1
                    outs          iamp * (a1 * ka + a2 * kb), iamp * (a3 * ka + a4 * kb)
                    endin

; Instrument 2
; vaste figuren gedefinieerd in tabellen
                    instr         2
ifactor             init          p7
ifreq               init          kr / ifactor

kgat                chnget        "hole"
kfase               chnget        "phase"

done3:
iringidx            init          p4
iring               table         iringidx, 6
ifig                init          p5
iaantalwielen        init          p6
iamp                init          32000
irr                 init          3.05
kcnt                init          0

ktblidx             =             kcnt / ifactor % iaantalwielen
kcnt                =             kcnt + 1
kwielidx            table         ktblidx, ifig
kgat1               table         ktblidx, ifig + 1
kfase1              table         ktblidx, ifig + 2
kwiel                table          kwielidx, 3
krondjes            table         kwielidx, iringidx + 4
kfreq               =             ifreq * krondjes
kwr                 =             kwiel / iring
ka                  =             1 - kwr
apha1               phasor        kfreq
afase1              =             apha1 + kfase + kfase1 / iring
apha2               phasor        kfreq * (kwr - 1) / kwr
afase2              =             apha2 + kfase + kfase1 / iring
kb                  =             kwr - (0.0647059 * (kgat1 + kgat * 10.0 - 1.0) + 0.31) / irr
a1                  table         afase1, 1, 1, 0, 1
a2                  table         afase2, 1, 1, 0, 1
a3                  table         afase1, 2, 1, 0, 1
a4                  table         afase2, 2, 1, 0, 1
                    outs          iamp * (a1 * ka + a2 * kb), iamp * (a3 * ka + a4 * kb)
                    endin
</CsInstruments>
<CsScore>
; cosinus tabel
f 1 0 16384 11 1
; sinus tabel
f 2 0 16384 10 1

; *** lookup-tables
; wielen
;            0  1  2  3  4  5  6  7  8  9 10 11 12 13 14 15
f 3 0 16 -2 24 30 32 36 40 45 48 52 56 60 63 64 72 75 80 84
; aantal rondjes bij ring 96
f 4 0 16 -2  1  5  1  3  5 15  1 13  7  5 21  2  3 25  5  7
; aantal rondjes bij ring 105
f 5 0 16 -2  8  2 32 12  8  3 16 52  8  4  3 64 24  5 16  4
; ringen
f 6 0  2 -2 96 105

; *** figuren
; wielen
f 10 0 8 -2  0 14 14 14
; gaten
f 11 0 8 -2  5 13 14 15
; fases
f 12 0 8 -2  0  0  0  0

; wielen
f 13 0 16 -2  1  1  1  5  5  5  9  9  9 13 13 13
; gaten
f 14 0 16 -2  1  2  3  6  7  8 11 12 13 16 17 18
; fases
f 15 0 16 -2  0  0  0  0  0  0  0  0  0  0  0  0

; wielen
f 16 0 32 -2  4  8 14 12  0  2 11  6 14 12  0  2 11  6 12  0  2 11  6  2 11  6  6  6
; gaten
f 17 0 32 -2  5  9 15 13  1  3 11  7 15 13  1  3 11  7 13  1  3 11  7  3 11  7  7  7 
; fases
f 18 0 32 -2  0  0  0  0  0  0  0  0  8  8  8  8  8  8 16 16 16 16 16 24 24 24 32 40

; wielen
f 19 0 16 -2  1  1  1  1  1  5  5  5  5  5  9  9  9  9  9
; gaten
f 20 0 16 -2  1  2  3  4  5  1  2  3  4  5  1  2  3  4  5
; fases
f 21 0 16 -2  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0

; wielen
f 22 0 8 -2    9    9    9    9    9    9    9    9    9
; gaten
f 23 0 8 -2    1    2    3    2    3    4    5    4    5
; fases
f 24 0 8 -2    0  0.5    1 -0.5   -1  1.5    2 -1.5    2

; instrument
f 100 0 16 -2   1   1   2   2   2   2   2
; ring
f 101 0 16 -2   0   1   1   1   0   1   1
; fig
f 102 0 16 -2   0   0  10  13  16  19  22
; aant
f 103 0 16 -2   0   0   4  12  24  15   9
; factor
f 104 0 16 -2   0   0  10   1   1   1   1

; 10000 keer herhalen
r 10000
; een wiel
;ins start dur ring
i 1      0  30    0
i 1      +   .    1
; vaste figuren
;ins start dur ring fig aant factor
i 2     60   5    1  10    4      10
i 2      +   .    1  13   12      1
i 2      +   .    0  16   24      1
i 2      +   .    1  19   15      1
i 2      +   .    1  22    9      1
s
e
</CsScore>
</CsoundSynthesizer>
